
    import * as ninjas from '../ninjas';

    require( 'fpsmeter' );

    /*******************************************************************************************************************
    *   Specifies the game logic and all primal components of the game.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Game
    {
        /** The canvas element. */
        public      canvasSystem            :ninjas.CanvasSystem            = null;
        /** The image system. */
        public      imageSystem             :ninjas.ImageSystem             = null;
        /** The soundSystem system. */
        public      soundSystem             :ninjas.SoundSystem             = null;
        /** The matterJS engine. */
        public      matterJsSystem          :ninjas.MatterJsSystem          = null;
        /** The site system. */
        public      siteSystem              :ninjas.SiteSystem              = null;
        /** The FPS counter. */
        private     fpsMeter                :FPSMeter                       = null;
        /** The custom key system. */
        public      keySystem               :ninjas.KeySystem               = null;

        /** The custom camera system. */
        public      camera                  :ninjas.Camera                  = null;
        /** The custom level. */
        public      level                   :ninjas.Level                   = null;

        /***************************************************************************************************************
        *   Inits all components of the game.
        ***************************************************************************************************************/
        public init()
        {
            this.initCanvas();
            this.updateCanvasDimensions();
            this.initImageSystem();
        }

        /***************************************************************************************************************
        *   Being invoked when all images are loaded.
        ***************************************************************************************************************/
        private onImagesLoaded=() : void =>
        {
            ninjas.SpriteTemplate.assignAllImageSizes();

            this.initSoundSystem();
        };

        /***************************************************************************************************************
        *   Being invoked when all sounds are loaded.
        ***************************************************************************************************************/
        private onSoundsLoaded=() : void =>
        {
            // init matterJS
            this.initMatterJS();

            // init site system
            this.initSiteSystem();

            // init window resize handler
            this.initWindowResizeHandler();

            // init FPS-counter
            this.initFpsCounter();

            // init key system
            this.initKeySystem();

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
            this.matterJsSystem.startRenderer();

            window.setInterval(
                this.tick,
                ninjas.Setting.RENDER_DELTA
            );
        }

        /***************************************************************************************************************
        *   Updates the dimensions of the canvas according to the browser window.
        *
        *   TODO prune?
        ***************************************************************************************************************/
        private updateCanvasDimensions()
        {
            this.canvasSystem.updateDimensions();
        }

        /***************************************************************************************************************
        *   Inits the 2D canvas by creating and adding it to the document body.
        ***************************************************************************************************************/
        private initCanvas()
        {
            // create canvas system
            this.canvasSystem = new ninjas.CanvasSystem();
        }

        /***************************************************************************************************************
        *   Inits the 2D engine.
        *
        *   TODO prune?
        ***************************************************************************************************************/
        private initMatterJS()
        {
            ninjas.Debug.init.log( "Initing 2D physics engine" );

            this.matterJsSystem = new ninjas.MatterJsSystem
            (
                this.canvasSystem.getCanvas(),
                ( renderContext:CanvasRenderingContext2D ) => { this.paint( renderContext ); },
                this.imageSystem.getAll()
            );
        }

        /***************************************************************************************************************
        *   Inits the window resize handler.
        ***************************************************************************************************************/
        private initWindowResizeHandler()
        {
            // TODO oursource function!
            window.onresize = ( event:Event ) => {

                this.updateCanvasDimensions();
                this.matterJsSystem.updateEngineDimensions
                (
                    this.canvasSystem.getWidth(),
                    this.canvasSystem.getHeight()
                );
                this.siteSystem.updatePanelSizeAndPosition();
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
        *   Inits the site system. TODO prune!
        ***************************************************************************************************************/
        private initSiteSystem()
        {
            ninjas.Debug.init.log( "Initing site system" );

            this.siteSystem = new ninjas.SiteSystem();
        }

        /***************************************************************************************************************
        *   Inits the FPS counter.
        ***************************************************************************************************************/
        private initFpsCounter()
        {
            ninjas.Debug.init.log( "Initing FPS counter" );

            this.fpsMeter = new FPSMeter(
                null,
                {
                    graph:    1,
                    decimals: 1,
                    position: "absolute",
                    zIndex:   10,
                    top:      "auto",
                    right:    ninjas.Setting.SITE_BORDER_SIZE + "px",
                    bottom:   ninjas.Setting.SITE_BORDER_SIZE + "px",
                    left:     "auto",
                    margin:   "0",
                    heat:     1,
                }
            );
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
            this.matterJsSystem.resetWorld();

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
                this.matterJsSystem.getRenderer(),
                ninjas.Setting.CAMERA_RATIO_X,
                ninjas.Setting.CAMERA_RATIO_Y,
                ninjas.Setting.CAMERA_MOVING_SPEED,
                ninjas.Setting.CAMERA_MOVING_MINIMUM,
                ninjas.Setting.CAMERA_MOVING_MAXIMUM,
                this.level.width,
                this.level.height,
                this.canvasSystem.getWidth(),
                this.canvasSystem.getHeight()
            );
            this.camera.reset();
        }

        /***************************************************************************************************************
        *   Being invoked each tick of the game loop in order to render the game.
        ***************************************************************************************************************/
        private tick=()=>
        {
            this.fpsMeter.tickStart();

            // render the engine
            this.render();

            // update MatterJS 2d engine
            this.matterJsSystem.updateEngine( ninjas.Setting.RENDER_DELTA );

            this.fpsMeter.tick();
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
                this.level.player.collidesBottom,
                this.siteSystem.getFixedCameraTargetX()
            );
        }

        /***************************************************************************************************************
        *   Paints all overlays after Matter.js completed rendering the scene.
        ***************************************************************************************************************/
        private paint( context:CanvasRenderingContext2D )
        {
            let testHudWidth:number  = 150;
            let testHudHeight:number = 50;

            context.fillStyle = "#ff0000";
            context.fillRect( this.canvasSystem.getWidth() - ninjas.Setting.SITE_BORDER_SIZE - testHudWidth, ninjas.Setting.SITE_BORDER_SIZE, testHudWidth, testHudHeight );
            // context.fillRect( this.canvasWidth - ninjas.Setting.SITE_BORDER_SIZE - testHudWidth, this.canvasHeight - ninjas.Setting.SITE_BORDER_SIZE - testHudHeight, testHudWidth, testHudHeight );
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
