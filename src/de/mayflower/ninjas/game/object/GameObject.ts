
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

        /** Game object shape. */
        public          shape                   :ninjas.Shape                   = null;

        /** Game object image. */
        public          image                   :HTMLImageElement               = null;

        /***************************************************************************************************************
        *   Creates a new game object.
        *
        *   @param shape      The shape for this object.
        *   @param x          Startup position X.
        *   @param y          Startup position Y.
        *   @param image      The image for this game object.
        ***************************************************************************************************************/
        protected constructor
        (
            shape :ninjas.Shape,
            x     :number,
            y     :number,
            image :HTMLImageElement
        )
        {
            this.shape = shape;
            this.setImage( image );

            matter.Body.translate( this.shape.body, matter.Vector.create( x, y ) );
        }

        /***************************************************************************************************************
        *   Renders the current game object.
        ***************************************************************************************************************/
        public abstract render();

        /***************************************************************************************************************
        *   Sets a new image for this game object.
        *
        *   @param image The image source to set.
        ***************************************************************************************************************/
        protected setImage( image:HTMLImageElement ) : void
        {
            if ( image != null )
            {
                this.image = image;
                this.shape.body.render.sprite.texture = image.src;
            }
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
