
    import * as matter from 'matter-js';
    import * as ninjas from '../../ninjas';

    /*******************************************************************************************************************
    *   The abstract class of all game objects.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export abstract class GameObject
    {
        /** Highest surface friction. */
        public  static  FRICTION_CONCRETE       :number                         = 1.0;
        /** Default surface friction. */
        public  static  FRICTION_DEFAULT        :number                         = 0.1;
        /** Low surface friction. */
        public  static  FRICTION_GLASS          :number                         = 0.01;
        /** Lowest surface friction. */
        public  static  FRICTION_ICE            :number                         = 0.0;

        /** Character density. */
        public  static  DENSITY_HUMAN           :number                         = 0.01;
        /** Default density. */
        public  static  DENSITY_DEFAULT         :number                         = 0.001;

        /** Collision shape. */
        public          shape                   :ninjas.Shape                   = null;

        /** Sprite. */
        public          sprite                  :ninjas.Sprite                  = null;

        /***************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param shape          The shape for this object.
        *   @param spriteTemplate The sprite template to use for this game object.
        *   @param x              Startup position X.
        *   @param y              Startup position Y.
        ***************************************************************************************************************/
        protected constructor
        (
            shape          :ninjas.Shape,
            spriteTemplate :ninjas.SpriteTemplate,
            x              :number,
            y              :number
        )
        {
            this.shape = shape;
            this.setSprite( spriteTemplate );

            matter.Body.translate( this.shape.body, matter.Vector.create( x, y ) );
        }

        /***************************************************************************************************************
        *   Sets the specified sprite template.
        *
        *   @param spriteTemplate The sprite template to use for this new sprite.
        ***************************************************************************************************************/
        protected setSprite( spriteTemplate:ninjas.SpriteTemplate )
        {
            if ( spriteTemplate != null )
            {
                // deny setting new sprite if same sprite than existent
                if ( this.sprite != null && this.sprite.template == spriteTemplate )
                {
                    return;
                }

                // assign new sprite and texture
                this.sprite = new ninjas.Sprite( spriteTemplate );
                this.setImageFromSprite();

                // do NOT update body shape dimensions! immediate collisions will occur and block the game!
                // this.shape.updateDimensions( this.sprite.width, this.sprite.height );
            }
        }

        /***************************************************************************************************************
        *   Renders the current game object.
        ***************************************************************************************************************/
        public render()
        {
            if ( this.sprite != null )
            {
                // render sprite and check frame change
                if ( this.sprite.render() )
                {
                    this.setImageFromSprite();
                }
            }
        }

        /***************************************************************************************************************
        *   Assigns the current active sprite frame as the game objects image.
        ***************************************************************************************************************/
        protected setImageFromSprite() : void
        {
            this.shape.body.render.sprite.texture = this.sprite.getCurrentFrameImageUrl();

            this.shape.body.render.sprite.xScale = -1.0;
        }

        /***************************************************************************************************************
        *   Avoids this game object from rotating.
        ***************************************************************************************************************/
        protected resetRotation()
        {
            matter.Body.setAngularVelocity( this.shape.body, 0.0 );
            matter.Body.setAngle(           this.shape.body, 0.0 );
        }

        /***************************************************************************************************************
        *   Clips this body to the horizontal level bounds.
        ***************************************************************************************************************/
        protected clipToHorizontalLevelBounds()
        {
            // clip left bound
            if ( this.shape.body.position.x < this.shape.getWidth() / 2 )
            {
                matter.Body.setPosition(
                    this.shape.body,
                    {
                        x: this.shape.getWidth() / 2,
                        y: this.shape.body.position.y
                    }
                );
            }

            // clip right bound
            if ( this.shape.body.position.x > ninjas.Main.game.level.width - this.shape.getWidth() / 2 )
            {
                matter.Body.setPosition(
                    this.shape.body,
                    {
                        x: ninjas.Main.game.level.width - this.shape.getWidth() / 2,
                        y: this.shape.body.position.y
                    }
                );
            }
        }
    }
