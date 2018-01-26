
    import * as Matter from 'matter-js';
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   Specifies the game logic and specifies all primal parts of the game.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Game
    {
        /** The MatterJS engine. */
        public      engine                  :Matter.Engine          = null;
        /** The MatterJS renderer. */
        private     renderer                :Matter.Render          = null;

        /** The custom key system. */
        public      keySystem               :ninjas.KeySystem       = null;
        /** The custom camera. */
        public      camera                  :ninjas.Camera          = null;
        /** The custom level. */
        public      level                   :ninjas.Level              = null;

        /** The soundSystem system. */
        public      test                    :ninjas.SoundSystem     = null;

        /***************************************************************************************************************
        *   Inits the game from scratch.
        ***************************************************************************************************************/
        public init()
        {
            ninjas.Debug.init.log( "Initing game engine" );

            this.initEngine2D();
            this.initKeySystem();
            this.initSoundSystem();

            ninjas.Debug.init.log( "Playing bg sounds" );
            // this.test.playSound( ninjas.ninjasSound.PACHELBELS_CANON );

            ninjas.Debug.init.log( "Launching initial level" );
            this.resetAndLaunchLevel( new ninjas.LevelDev() );
        }

        /***************************************************************************************************************
        *   Starts the game loop.
        ***************************************************************************************************************/
        public start()
        {
            // render 1st engine tick
            this.tick();

            // start the renderer
            Matter.Render.run( this.renderer );

            window.setInterval(
                this.tick,
                ninjas.Setting.RENDER_DELTA
            );
        }

        /***************************************************************************************************************
        *   Inits the 2D engine.
        ***************************************************************************************************************/
        private initEngine2D()
        {
            this.engine = Matter.Engine.create();

            let options:any =
            {
                hasBounds:          true,
                wireframes:         false,
                showCollisions:     true,
                showAngleIndicator: true,
                showVelocity:       true,
            };

            this.renderer = Matter.Render.create(
                {
                    element: document.body,
                    engine:  this.engine,
                    options: options,
                }
            );

            this.renderer.canvas.width  = ninjas.Setting.CANVAS_WIDTH;
            this.renderer.canvas.height = ninjas.Setting.CANVAS_HEIGHT;

            this.engine.world.gravity = {
                x: 0.0,
                y: ninjas.Setting.DEFAULT_GRAVITY_Y,
                scale: 0.001
            };
        }

        /***************************************************************************************************************
        *   Inits the key system.
        ***************************************************************************************************************/
        private initKeySystem()
        {
            this.keySystem = new ninjas.KeySystem();
        }

        /***************************************************************************************************************
        *   Inits the soundSystem system.
        ***************************************************************************************************************/
        private initSoundSystem()
        {
            this.test = new ninjas.SoundSystem( ninjas.Sound.FILE_NAMES );
        }

        /***************************************************************************************************************
        *   Inits the level.
        ***************************************************************************************************************/
        private resetAndLaunchLevel( levelToLaunch:ninjas.Level )
        {
            // clear world
            Matter.World.clear( this.engine.world, false );

            // assign and init level
            this.level = levelToLaunch;
            this.level.init();

            // reset camera
            this.camera = new ninjas.Camera(
                this.renderer,
                ninjas.Setting.CAMERA_RATIO_X,
                ninjas.Setting.CAMERA_RATIO_Y,
                ninjas.Setting.CAMERA_MOVING_SPEED,
                ninjas.Setting.CAMERA_MOVING_MINIMUM,
                this.level.width,
                this.level.height,
                ninjas.Setting.CANVAS_WIDTH,
                ninjas.Setting.CANVAS_HEIGHT
            );
            this.camera.reset();
        }

        /***************************************************************************************************************
        *   Being invoked each tick of the game loop in order to render the game.
        ***************************************************************************************************************/
        private tick=()=>
        {
            // render the engine
            this.render();

            // update MatterJS 2d engine
            Matter.Engine.update( this.engine, ninjas.Setting.RENDER_DELTA );
        };

        /***************************************************************************************************************
        *   Renders all game components.
        ***************************************************************************************************************/
        private render()
        {
            // handle menu key
            this.handleMenuKey();

            // render level
            this.level.render();

            // render camera
            this.camera.update(
                this.level.player.shape.body.position.x,
                this.level.player.shape.body.position.y,
                this.level.player.lookingDirection,
                this.level.player.collidesBottom
            );
        }

        /***************************************************************************************************************
        *   Handles pressed menu keys.
        ***************************************************************************************************************/
        private handleMenuKey()
        {
            if ( ninjas.Main.game.keySystem.isPressed( ninjas.KeySystem.KEY_1 ) )
            {
                ninjas.Main.game.keySystem.setNeedsRelease( ninjas.KeySystem.KEY_1 );

                ninjas.Debug.init.log( "Switching to level 1" );
                this.resetAndLaunchLevel( new ninjas.LevelDev() );
            }

            if ( ninjas.Main.game.keySystem.isPressed( ninjas.KeySystem.KEY_2 ) )
            {
                ninjas.Main.game.keySystem.setNeedsRelease( ninjas.KeySystem.KEY_2 );

                ninjas.Debug.init.log( "Switching to level 2" );
                this.resetAndLaunchLevel( new ninjas.LevelEnchantedWoods() );
            }
        }
    }
