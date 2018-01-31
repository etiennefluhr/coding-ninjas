
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO Enable fixed panel popup positions!
    *   TODO Create enums ImageMirror, SpriteLoop.
    *   TODO Enable different animations for site panel.
    *
    *
    *   TODO refactor to class class SitePanel. All fields private and reference both container divs !!!
    *
    *   TODO class game: outsource all init stuff to separate classes: GameEngine > Game and all Engine functions to Engine!
    *   TODO Move game object classes to appropriate subpackages!
    *   TODO Extend afterRender and beforeRender. Move FPS-tickStart methods there!
    *
    *   TODO Add 'attack' action and sprite.
    *   TODO Parallax Fence in fg. ( parallax machanism for game decos ? )
    *   TODO Create parallax bg images in bg and fg (pick parallex class!).
    *   TODO Auto-release all keys on losing canvas focus?
    *   TODO Character.isFalling(): consider bottomContact ? try this on ramps.
    *   TODO simplify sprite-image-system's frame ranges!
    *   TODO Create and use image ranges for sprite templates? [not possible though single filenames!]
    *
    *   TODO only mirror images where a mirrored SpriteTemplate exists!
    *   TODO Prevent ALL images from being mirrored?
    *   TODO enable texture cache for MatterJS game renderer?
    *   TODO fix flickering image issues ..!
    *   TODO Create HUD.
    *   TODO Create item pickup HUD effect!
    *   TODO Add tutorial notifiers.
    *   TODO Add react and ant design / ant design pro.
    *   TODO Add react for site content creation.
    *   TODO Add ant design for site contents.
    *
    *   TODO Setting: extract debub settings, engine settings etc. > own package?
    *   TODO outsource lib classes to package de.mayflower.lib??
    *   TODO Add cucumber tests.
    *   TODO Add jest tests.
    *   TODO separate maximum camera moving speed if fixed target is active?
    *
    *   TODO create method updateBody() for all shape classes??
    *   TODO Credits with top npm packages, staff, colaborators, best tools, free 2d art, primal web references etc,
    *
    *   TODO Try sound error handling! (Safari etc.)
    *   TODO Add jest tests.
    *   TODO Add cucumber tests.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game engine. */
        public      static          game                    :ninjas.Game                    = null;

        /*****************************************************************************
        *   This method is invoked when the application starts.
        *****************************************************************************/
        public static main() : void
        {
            // set webpage title
            document.title = ninjas.Setting.TITLE;

            // acclaim debug console
            ninjas.Debug.init.log( ninjas.Setting.TITLE );
            ninjas.Debug.init.log();

            //init and start the game engine
            Main.game = new ninjas.Game();
            Main.game.init();
        }
    }
