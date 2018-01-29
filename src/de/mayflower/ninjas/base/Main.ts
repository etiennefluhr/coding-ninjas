
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO class game: outsource all init stuff to separate classes: GameEngine > Game and Engine
    *   TODO Add FPS counter via npm package.
    *   TODO move creation of Site-PopUp to init method!
    *   TODO Check if wowjs is really required .. maybe animate.css is sufficient.
    *   TODO Update site popup size on resizing the screen.
    *   TODO Move camera to screen quarter on showing popup.
    *   TODO Enable popup from left or right.
    *   TODO Enable different animations for popup.
    *   TODO animate.css effect on popup show and hide.
    *   TODO create wow popup on entering a room!
    *   TODO add random method to MathUtil!
    *   TODO Remove package wowJs
    *   TODO outsource according functions from class Site to SitePopup.
    *   TODO Turn Site to non-static class.
    *   TODO Try sound error handling! (Safari etc.)
    *   TODO Create parallax bg images.
        TODO Character.isFalling(): consider bottomContact ? try this on ramps.
    *   TODO import methods for class 'Drawing' from box2d game.
    *   TODO Add react and ant design / ant design pro.
    *   TODO Create and use image ranges for sprite templates?
    *   TODO Fence in fg.
    *   TODO simplify sprite-image-system's frame ranges!
    *   TODO Move game object classes to appropriate subpackages!
    *   TODO only mirror images where a mirrored SpriteTemplate exists!
    *   TODO Create HUD.
    *   TODO Add popup on
    *   TODO Setting: extract debub settings, engine settings etc. > own package?
    *   TODO Add cucumber tests.
    *   TODO Add jest tests.
    *   TODO enable texture cache for MatterJS game renderer?
    *   TODO create method updateBody() for all shape classes?
    *   TODO Prevent ALL images from being mirrored?
    *   TODO Credits with top npm packages, staff, colaborators, best tools, free 2d art, primal web references etc,
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
            this.game = new ninjas.Game();
            this.game.init();
        }
    }
