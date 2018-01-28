
    import * as matter from 'matter-js';
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   Specifies the game logic and all primal components of the game.
    *
    *   TODO outsource all init stuff to separate classes: GameEngine > Game and Engine
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Game
    {
        /** The canvas element. */
        public      canvas                  :HTMLCanvasElement              = null;
        /** The canvas rendering context. */
        public      canvasContext           :CanvasRenderingContext2D       = null;
        /** The current width of the canvas. */
        public      canvasWidth             :number                         = 0;
        /** The current height of the canvas. */
        public      canvasHeight            :number                         = 0;

        /** The MatterJS engine. */
        public      engine                  :matter.Engine                  = null;
        /** The MatterJS renderer. */
        private     renderer                :matter.Render                  = null;

        /** The custom key system. */
        public      keySystem               :ninjas.KeySystem               = null;
        /** The custom camera. */
        public      camera                  :ninjas.Camera                  = null;
        /** The custom level. */
        public      level                   :ninjas.Level                   = null;

        /** The image system. */
        public      imageSystem             :ninjas.ImageSystem             = null;
        /** The soundSystem system. */
        public      soundSystem             :ninjas.SoundSystem             = null;

        /***************************************************************************************************************
        *   Inits all components of the game.
        ***************************************************************************************************************/
        public init()
        {
            this.updateCanvasDimension();
            this.initCanvas();
            this.initEngine2D();
            this.initWindowResizeHandler();
            this.initKeySystem();
            this.initImageSystem();
        }

        /***************************************************************************************************************
        *   Being invoked when all images are loaded.
        ***************************************************************************************************************/
        private onImagesLoaded=() : void =>
        {
            this.initSoundSystem();
        };

        /***************************************************************************************************************
        *   Being invoked when all sounds are loaded.
        ***************************************************************************************************************/
        private onSoundsLoaded=() : void =>
        {
            // play bg sound
            this.soundSystem.playSound( ninjas.Sound.BG_CHINESE, true );

            // launch initial level
            this.resetAndLaunchLevel( new ninjas.LevelWebsite() );

            // start game loop
            ninjas.Debug.init.log( "Initing game engine completed" );
            ninjas.Debug.init.log();
            this.start();
        };

        /***************************************************************************************************************
        *   Starts the game loop.
        ***************************************************************************************************************/
        private start()
        {
            // render 1st engine tick
            this.tick();

            // start the renderer
            matter.Render.run( this.renderer );

            window.setInterval(
                this.tick,
                ninjas.Setting.RENDER_DELTA
            );
        }

        /***************************************************************************************************************
        *   Updates the dimension of the canvas according to the browser window.
        ***************************************************************************************************************/
        private updateCanvasDimension()
        {
            this.canvasWidth  = window.innerWidth;
            this.canvasHeight = window.innerHeight;

            // clip to minimum canvas dimensions
            if ( this.canvasWidth  < ninjas.Setting.MIN_CANVAS_WIDTH  ) this.canvasWidth  = ninjas.Setting.MIN_CANVAS_WIDTH;
            if ( this.canvasHeight < ninjas.Setting.MIN_CANVAS_HEIGHT ) this.canvasHeight = ninjas.Setting.MIN_CANVAS_HEIGHT;

            ninjas.Debug.init.log( "Updated canvas dimension to [" + this.canvasWidth + "x" + this.canvasHeight + "] " );
        }

        /***************************************************************************************************************
        *   Inits the 2D canvas by creating and adding it to the document body.
        ***************************************************************************************************************/
        private initCanvas()
        {
            // create
            this.canvas = document.createElement( "canvas" );

            // reference 2d rendering context
            this.canvasContext = this.canvas.getContext( "2d" );

            // set dimension
            this.canvas.width  = this.canvasWidth;
            this.canvas.height = this.canvasHeight;

            // append to body
            document.body.appendChild( this.canvas );
        }

        /***************************************************************************************************************
        *   Inits the 2D engine.
        ***************************************************************************************************************/
        private initEngine2D()
        {
            ninjas.Debug.init.log( "Initing 2D physics engine" );

            // create engine
            this.engine = matter.Engine.create();
            this.engine.world.gravity = {
                x: 0.0,
                y: ninjas.Setting.DEFAULT_GRAVITY_Y,
                scale: 0.001
            };

            // create renderer
            this.renderer = matter.Render.create(
                {
                    canvas:  this.canvas,
                    engine:  this.engine,
                    options: {
                        hasBounds:          true,
                        wireframes:         false,
                        showCollisions:     true,
                        showAngleIndicator: true,
                        showVelocity:       true,

                        width:              this.canvasWidth,
                        height:             this.canvasHeight,

                        // TODO enable texture cache?
                        // textures:           ninjas.Image.FILE_NAMES,
                    } as any,
                }
            );

            // disables blurry image drawing!
            this.renderer.context.imageSmoothingEnabled = false;

            // add drawing callback after rendering
            matter.Events.on(
                this.renderer,
                'afterRender',
                ( event ) => {
                    this.paint( this.renderer.context );
                }
            );
        }

        /***************************************************************************************************************
        *   Inits the window resize handler.
        ***************************************************************************************************************/
        private initWindowResizeHandler()
        {
            window.onresize = ( event:Event ) => {

                this.updateCanvasDimension();

                this.renderer.canvas.width  = this.canvasWidth;
                this.renderer.canvas.height = this.canvasHeight;

                this.renderer.options.width  = this.canvasWidth;
                this.renderer.options.height = this.canvasHeight;

                this.resetCamera();
            };
        }

        /***************************************************************************************************************
        *   Inits the key system.
        ***************************************************************************************************************/
        private initKeySystem()
        {
            ninjas.Debug.init.log( "Initing key system" );

            this.keySystem = new ninjas.KeySystem();
        }

        /***************************************************************************************************************
        *   Inits the image system.
        ***************************************************************************************************************/
        private initImageSystem()
        {
            ninjas.Debug.init.log( "Initing image system" );

            this.imageSystem = new ninjas.ImageSystem( ninjas.Image.FILE_NAMES, this.onImagesLoaded );
            this.imageSystem.loadImages();
        }

        /***************************************************************************************************************
        *   Inits the sound system.
        ***************************************************************************************************************/
        private initSoundSystem()
        {
            ninjas.Debug.init.log( "Initing sound system" );

            this.soundSystem = new ninjas.SoundSystem( ninjas.Sound.FILE_NAMES, this.onSoundsLoaded );
            this.soundSystem.loadSounds();
        }

        /***************************************************************************************************************
        *   Inits the level.
        ***************************************************************************************************************/
        private resetAndLaunchLevel( levelToLaunch:ninjas.Level )
        {
            // clear world
            matter.World.clear( this.engine.world, false );

            // assign and init level
            this.level = levelToLaunch;
            this.level.init();

            // reset camera
            this.resetCamera();
        }

        /***************************************************************************************************************
        *   Resets the camera.
        ***************************************************************************************************************/
        private resetCamera()
        {
            this.camera = new ninjas.Camera(
                this.renderer,
                ninjas.Setting.CAMERA_RATIO_X,
                ninjas.Setting.CAMERA_RATIO_Y,
                ninjas.Setting.CAMERA_MOVING_SPEED,
                ninjas.Setting.CAMERA_MOVING_MINIMUM,
                this.level.width,
                this.level.height,
                this.canvasWidth,
                this.canvasHeight
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
            matter.Engine.update( this.engine, ninjas.Setting.RENDER_DELTA );
/*
            let context:CanvasRenderingContext2D = this.canvas.getContext( "2d" );
            context.fillStyle = "#ff0000";
            context.fillRect( 0, 0, 100, 200 );
*/
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
        *   Paints all overlays after Matter.js completed rendering the scene.
        ***************************************************************************************************************/
        private paint( context:CanvasRenderingContext2D )
        {
            this.renderer.context.fillStyle = "#ff0000";
            this.renderer.context.fillRect( this.canvasWidth - 200, 50, 150, 50 );

            this.renderer.context.drawImage( this.imageSystem.testImage, 0, 0 );
        }

        /***************************************************************************************************************
        *   Handles pressed menu keys.
        ***************************************************************************************************************/
        private handleMenuKey()
        {
            if ( ninjas.Main.game.keySystem.isPressed( ninjas.Key.KEY_1 ) )
            {
                ninjas.Main.game.keySystem.setNeedsRelease( ninjas.Key.KEY_1 );

                ninjas.Debug.init.log( "Switching to level 1" );
                this.resetAndLaunchLevel( new ninjas.LevelWebsite() );
            }

            if ( ninjas.Main.game.keySystem.isPressed( ninjas.Key.KEY_2 ) )
            {
                ninjas.Main.game.keySystem.setNeedsRelease( ninjas.Key.KEY_2 );

                ninjas.Debug.init.log( "Switching to level 2" );
                this.resetAndLaunchLevel( new ninjas.LevelAllElements() );
            }

            if ( ninjas.Main.game.keySystem.isPressed( ninjas.Key.KEY_3 ) )
            {
                ninjas.Main.game.keySystem.setNeedsRelease( ninjas.Key.KEY_3 );

                ninjas.Debug.init.log( "Switching to level 3" );
                this.resetAndLaunchLevel( new ninjas.LevelEnchantedWoods() );
            }
        }
    }
