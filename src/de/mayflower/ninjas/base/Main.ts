
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO Adjust physics object according to image dimensions!
    *   TODO create sprite system.
    *   TODO create wow popup on entering a room!
    *   TODO Try sound error handling! (Safari etc.)
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
        public static main():void
        {
            // acclaim debug console and set title
            ninjas.Debug.init.log( ninjas.Setting.TITLE );
            document.title = ninjas.Setting.TITLE;

            //init and start the game engine
            this.game = new ninjas.Game();
            this.game.init();
        }
    }
