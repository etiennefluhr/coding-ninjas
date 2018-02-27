
    import * as matter from 'matter-js';
    import * as ninjas from '../../../ninjas';

    /*******************************************************************************************************************
    *   Represents a character's looking direction.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export enum CharacterLookingDirection
    {
        /** Looking left. */
        LEFT,

        /** Looking right. */
        RIGHT,
    }

    /*******************************************************************************************************************
    *   Represents a character.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export abstract class Character extends ninjas.GameObject
    {
        /** The looking direction for this character. */
        public                          lookingDirection                    :ninjas.CharacterLookingDirection   = null;
        /** Flags if the character currently collides with the bottom sensor. */
        public                          collidesBottom                      :boolean                            = false;

        /** Flags if this character is gliding. */
        protected                       gliding                             :boolean                            = false;
        /** Flags if this character is requesting gliding while ascending etc. */
        protected                       glidingRequest                      :boolean                            = false;

        /** Flags if the character is currently moving left. */
        protected                       movesLeft                           :boolean                            = false;
        /** Flags if the character is currently moving right. */
        protected                       movesRight                          :boolean                            = false;

        /** The speed for horizontal movements. */
        private                         speedMove                           :number                             = 0.0;
        /** The jump power to apply for this character. */
        private                         jumpPower                           :number                             = 0.0;
        /** Flags if this character is dead. */
        private                         dead                                :boolean                            = false;

        /***************************************************************************************************************
        *   Creates a new character.
        *
        *   @param shape            The shape for this object.
        *   @param spriteTemplate   The sprite template to use for this game object.
        *   @param x                Startup position X.
        *   @param y                Startup position Y.
        *   @param lookingDirection The initial looking direction.
        *   @param speedMove        The speed for horizontal movement.
        *   @param jumpPower        The vertical force to apply on jumping.
        ***************************************************************************************************************/
        public constructor
        (
            shape            :ninjas.Shape,
            spriteTemplate   :ninjas.SpriteTemplate,
            x                :number,
            y                :number,
            lookingDirection :ninjas.CharacterLookingDirection,
            speedMove        :number,
            jumpPower        :number
        )
        {
            super
            (
                shape,
                spriteTemplate,
                x,
                y
            );

            this.lookingDirection = lookingDirection;
            this.speedMove        = speedMove;
            this.jumpPower        = jumpPower;
        }

        /***************************************************************************************************************
        *   Renders the current character tick.
        ***************************************************************************************************************/
        public render()
        {
            super.render();

            this.movesLeft  = false;
            this.movesRight = false;

            this.resetRotation();
            this.clipToHorizontalLevelBounds();
            this.checkBottomCollision();
            this.checkParachuteState();

            if ( !this.isDead() )
            {
                this.checkFallingDead();
            }
        }

        /***************************************************************************************************************
        *   Kills this character.
        ***************************************************************************************************************/
        public kill()
        {
            this.dead = true;
        }

        /***************************************************************************************************************
        *   Lets this enemy punch out of the screen.
        ***************************************************************************************************************/
        public punchOut()
        {
            switch ( this.lookingDirection )
            {
                case ninjas.CharacterLookingDirection.LEFT:
                {
                    matter.Body.applyForce
                    (
                        this.shape.body,
                        this.shape.body.position,
                        matter.Vector.create( -1.0, -2.0 )
                    );
                    break;
                }

                case ninjas.CharacterLookingDirection.RIGHT:
                {
                    matter.Body.applyForce
                    (
                        this.shape.body,
                        this.shape.body.position,
                        matter.Vector.create( 1.0, -2.0 )
                    );
                    break;
                }
            }
        }

        /***************************************************************************************************************
        *   Determines if this character is dead.
        *
        *   @return <code>true</code> if this character is dead.
        ***************************************************************************************************************/
        public isDead() : boolean
        {
            return this.dead;
        }

        /***************************************************************************************************************
        *   Lets this character jump.
        ***************************************************************************************************************/
        protected jump() : void
        {
            matter.Body.applyForce
            (
                this.shape.body,
                this.shape.body.position,
                matter.Vector.create( 0.0, this.jumpPower )
            );
        }

        /***************************************************************************************************************
        *   Requests gliding for the player so the parachute will open on next descending phase.
        ***************************************************************************************************************/
        protected requestGliding() : void
        {
            ninjas.Debug.character.log( "Character requests gliding" );

            this.glidingRequest = true;
        }

        /***************************************************************************************************************
        *   Checks the state for the parachute and opens or closes it.
        ***************************************************************************************************************/
        protected checkParachuteState() : void
        {
            if ( this.collidesBottom )
            {
                if ( this.gliding )
                {
                    this.closeParachute();
                }

                this.glidingRequest = false;
            }
            else
            {
                if ( this.glidingRequest && this.isFalling() )
                {
                    this.openParachute();
                    this.glidingRequest = false;
                }
            }
        }

        /***************************************************************************************************************
        *   Open character's parachute.
        ***************************************************************************************************************/
        private openParachute() : void
        {
            ninjas.Debug.character.log( "Character opens parachute" );

            this.shape.body.frictionAir = ninjas.BodyFrictionAir.GLIDING;
            this.gliding = true;
        }

        /***************************************************************************************************************
        *   Closes character's parachute.
        ***************************************************************************************************************/
        private closeParachute() : void
        {
            ninjas.Debug.character.log( "Character closes parachute" );

            this.shape.body.frictionAir = ninjas.BodyFrictionAir.DEFAULT;
            this.gliding = false;
        }

        /***************************************************************************************************************
        *   Moves this character left.
        ***************************************************************************************************************/
        protected moveLeft() : void
        {
            matter.Body.translate( this.shape.body, matter.Vector.create( -this.speedMove, 0 ) );
            this.movesLeft = true;
            this.lookingDirection = ninjas.CharacterLookingDirection.LEFT;

            // check in-air collision
            if ( !this.collidesBottom && this.isCollidingObstacle() )
            {
                // take back movement
                matter.Body.translate( this.shape.body, matter.Vector.create( this.speedMove, 0 ) );
            }
        }

        /***************************************************************************************************************
        *   Moves this character left.
        ***************************************************************************************************************/
        protected moveRight() : void
        {
            matter.Body.translate( this.shape.body, matter.Vector.create( this.speedMove, 0 ) );
            this.movesRight = true;
            this.lookingDirection = ninjas.CharacterLookingDirection.RIGHT;

            // check in-air collision
            if ( !this.collidesBottom && this.isCollidingObstacle() )
            {
                // take back movement
                matter.Body.translate( this.shape.body, matter.Vector.create( -this.speedMove, 0 ) );
            }
        }

        /***************************************************************************************************************
        *   Checks if this character is currently falling.
        *
        *   @return <code>true</code> if this character is currently falling.
        ***************************************************************************************************************/
        public isFalling() : boolean
        {
            return ( this.shape.body.velocity.y > 0.0 && !this.collidesBottom );
        }

        /***************************************************************************************************************
        *   Checks if this character is currently ascending.
        *
        *   @return <code>true</code> if this character is currently jumping.
        ***************************************************************************************************************/
        public isJumping() : boolean
        {
            return ( this.shape.body.velocity.y < 0.0 && !this.collidesBottom );
        }

        /***************************************************************************************************************
        *   Checks if this character is currently moving.
        *
        *   @return <code>True</code> if the player is currently moving.
        ***************************************************************************************************************/
        public isMoving() : boolean
        {
            return ( this.movesLeft || this.movesRight );
        }

        /***************************************************************************************************************
        *   Check if the player falls to death by falling out of the level.
        ***************************************************************************************************************/
        private checkFallingDead() : void
        {
            if ( this.shape.body.position.y - this.shape.getHeight() / 2 > ninjas.Main.game.level.height )
            {
                ninjas.Debug.character.log( "Character has fallen to dead" );

                // remove character body
                ninjas.Main.game.engine.matterJsSystem.removeFromWorld( this.shape.body );

                this.kill();
            }
        }

        /***************************************************************************************************************
        *   Checks if the character's bottom line currently collides with any other colliding body.
        ***************************************************************************************************************/
        private checkBottomCollision() : void
        {
            let bodiesToCheck:Array<matter.Body> = [];

            for ( let gameObject of ninjas.Main.game.level.movables )
            {
                bodiesToCheck.push( gameObject.shape.body );
            }
            for ( let gameObject of ninjas.Main.game.level.obstacles )
            {
                bodiesToCheck.push( gameObject.shape.body );
            }
            for ( let gameObject of ninjas.Main.game.level.enemies )
            {
                bodiesToCheck.push( gameObject.shape.body );
            }

            // check colliding bodies
            this.collidesBottom = matter.Query.ray
            (
                bodiesToCheck,
                matter.Vector.create( this.shape.body.position.x - ( this.shape.getWidth() / 2 ), this.shape.body.position.y + ( this.shape.getHeight() / 2 ) ),
                matter.Vector.create( this.shape.body.position.x + ( this.shape.getWidth() / 2 ), this.shape.body.position.y + ( this.shape.getHeight() / 2 ) )
            ).length > 0;
        }

        /***************************************************************************************************************
        *   Checks if the requested move for this character is collision free.
        *
        *   @return If this character is currently colliding with an obstacle.
        ***************************************************************************************************************/
        private isCollidingObstacle() : boolean
        {
            let bodiesToCheck:Array<matter.Body> = [];

            for ( let gameObject of ninjas.Main.game.level.obstacles )
            {
                // only consider rectangular obstacles
                if ( gameObject.shape instanceof ninjas.ShapeRectangle )
                {
                    bodiesToCheck.push( gameObject.shape.body );
                }
            }

            // check colliding bodies
            return matter.Query.region
            (
                bodiesToCheck,
                this.shape.body.bounds
            ).length > 0;
        }
    }
