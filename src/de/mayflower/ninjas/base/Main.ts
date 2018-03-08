
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO Try sound error handling! (Safari etc.)
    *   TODO Test in all browsers.
    *   TODO Ditch repository!
    *   TODO Complete MVP!
    *   TODO Parallax bg elements
    *
    *   TODO Assert debugger ready!
    *   TODO Create mobile version .. (minimum panel size and minimum canvas size 400px etc )
    *   TODO Add decoration particle effects on smashing objects / windows etc.
    *   TODO Add Camera joyride on level startup?
    *   TODO increase player jump speed?
    *   TODO requestAnimationFrame tryout .. matter.js - try 60 fps as a constant.
    *   TODO Sound effects for ninja girl and enemies?
    *   TODO Add destroyable movables.
    *   TODO Ask Lenz: Add file loader via npm.
    *   TODO Try 'grouce' for visualizing git project.
    *   TODO Add 'katana strike' action on ground and in air.
    *   TODO Add 'slide' action.
    *   TODO Add items and item sprites.
    *   TODO Create HUD ( for items 1st ).
    *   TODO create class HUD and assign its non-static method paintHud?
    *   TODO Create item pickup HUD effect!
    *   TODO Particle fx smashed crates, startup window etc.
    *   TODO Add jest tests.
    *   TODO Add event triggers (obstacles falling down on touching trigger etc.)
    *   TODO Add cucumber tests.
    *
    *   @author     Christopher Stock
    *   @version    1.0.0
    *******************************************************************************************************************/
    export class Main
    {
        /** The singleton instance of the game engine. */
        public      static          game                    :ninjas.Game                    = null;

        /***************************************************************************************************************
        *   This method is invoked when the application starts.
        ***************************************************************************************************************/
        public static main() : void
        {
            // set webpage title
            document.title = ninjas.SettingGame.TITLE;

            // acclaim debug console
            ninjas.Debug.preloader.log( ninjas.SettingGame.TITLE );
            ninjas.Debug.preloader.log();

            //init and start the game engine
            Main.game = new ninjas.Game();
            Main.game.preload();
        }
    }
