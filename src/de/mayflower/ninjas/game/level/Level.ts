
    import * as matter from 'matter-js';
    import * as ninjas from '../../ninjas';

    /*******************************************************************************************************************
    *   Represents the current level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export abstract class Level
    {
        /** The width of this level. */
        public      width                   :number                     = 0.0;
        /** The height of this level. */
        public      height                  :number                     = 0.0;

        /** The player instance. */
        public      player                  :ninjas.Player              = null;
        /** ALL game objects for this level, including the player. */
        public      gameObjects             :Array<ninjas.GameObject>   = null;

        /** Testing parallax bg. */
        public      parallaxTest            :ninjas.Decoration          = null;

        /***************************************************************************************************************
        *   Sets the player and the game objects.
        ***************************************************************************************************************/
        protected abstract createGameObjects();

        /***************************************************************************************************************
        *   Inits a new level.
        ***************************************************************************************************************/
        public init()
        {
            this.createGameObjects();

            // add all bodies of all game objects to the world
            for ( let gameObject of this.gameObjects ) {
                ninjas.Main.game.engine.matterJsSystem.addToWorld( gameObject.shape.body );
            }
        }

        /***************************************************************************************************************
        *   Renders all level components.
        ***************************************************************************************************************/
        public render()
        {
            // render game objects
            for ( let gameObject of this.gameObjects )
            {
                gameObject.render();
            }

            // test rendering parallax objects
            if ( this.parallaxTest != null )
            {
                let imgOffsetX :number = 0 - ( this.parallaxTest.shape.getWidth()  - ninjas.Main.game.engine.canvasSystem.getWidth()  ) * ninjas.Main.game.camera.getOffsetX() / ( this.width  - ninjas.Main.game.engine.canvasSystem.getWidth()  );
                let imgOffsetY :number = 0 - ( this.parallaxTest.shape.getHeight() - ninjas.Main.game.engine.canvasSystem.getHeight() ) * ninjas.Main.game.camera.getOffsetY() / ( this.height - ninjas.Main.game.engine.canvasSystem.getHeight() );

                matter.Body.setPosition
                (
                    this.parallaxTest.shape.body,
                    matter.Vector.create(
                        imgOffsetX + ninjas.Main.game.camera.getOffsetX() + ( this.parallaxTest.shape.getWidth()  / 2 ),
                        imgOffsetY + ninjas.Main.game.camera.getOffsetY() + ( this.parallaxTest.shape.getHeight() / 2 )
                    )
                )
            }
        }
    }
