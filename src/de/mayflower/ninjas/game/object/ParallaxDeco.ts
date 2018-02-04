
    import * as ninjas from '../../ninjas';
    import * as matter from "matter-js";

    /*******************************************************************************************************************
    *   Represents a non-colliding decoration.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class ParallaxDeco extends ninjas.Decoration
    {
        /** The parallax ratio from this game object to the level width. Defaults to 1.0. */
        private                 parallaxRatio           :number             = 0.0;
        /** The startup position X. */
        private                 startupX                :number             = 0.0;
        /** The startup position Y. */
        private                 startupY                :number             = 0.0;

        /***************************************************************************************************************
        *   Creates a new parallax decoration.
        *
        *   @param shape         The shape for this object.
        *   @param sprite        The sprite to use.
        *   @param x             Startup position X.
        *   @param y             Startup position Y.
        *   @param parallaxRatio The parallax ratio from this game object to the level width. Defaults to 1.0.
        ***************************************************************************************************************/
        public constructor( shape:ninjas.Shape, sprite:ninjas.Sprite, x:number, y:number, parallaxRatio:number )
        {
            super
            (
                shape,
                sprite,
                x,
                y,
            );

            this.parallaxRatio = parallaxRatio;
            this.startupX      = x;
            this.startupY      = y;
        }

        /***************************************************************************************************************
        *   Renders this decoration.
        ***************************************************************************************************************/
        public render()
        {
            super.render();

            this.setParallaxPosition();
        }

        /***************************************************************************************************************
        *   Sets the current parallax position of this deco.
        ***************************************************************************************************************/
        private setParallaxPosition()
        {
            // TODO you must assume that every element has the exact width of the level!!

            let levelWidth  :number = ninjas.Main.game.level.width;
            let levelHeight :number = ninjas.Main.game.level.height;

            let cameraOffsetX :number = ninjas.Main.game.camera.getOffsetX();
            let cameraOffsetY :number = ninjas.Main.game.camera.getOffsetY();

            let canvasWidth  :number = ninjas.Main.game.engine.canvasSystem.getWidth();
            let canvasHeight :number = ninjas.Main.game.engine.canvasSystem.getHeight();

            let imgOffsetX :number = 0 - ( this.shape.getWidth()  - canvasWidth  ) * cameraOffsetX / ( levelWidth  - canvasWidth  );
            let imgOffsetY :number = 0 - ( this.shape.getHeight() - canvasHeight ) * cameraOffsetY / ( levelHeight - canvasHeight );

            imgOffsetX *= this.parallaxRatio;
            imgOffsetY *= this.parallaxRatio;

            matter.Body.setPosition
            (
                this.shape.body,
                matter.Vector.create(
                    imgOffsetX + cameraOffsetX + ( this.shape.getWidth()  / 2 ),
                    imgOffsetY + cameraOffsetY + ( this.shape.getHeight() / 2 )
                )
            )
        }
    }
