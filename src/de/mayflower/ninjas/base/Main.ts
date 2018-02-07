
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO Group different objects in level class!?
    *   TODO Remove timeout and use Engine.events.tick?
    *   TODO Add and assign actions for 'attack', 'jump attack', 'slide' and 'float' sprites.
    *   TODO Revise parallax rendering though different groups in level class.
    *   TODO Try friction, frictionStatic and frictionAir to Shape!
    *   TODO restitution will bounce balls!
    *   TODO Fix ascending ramp issue! (player getting stuck on same height - check floating point difference)
    *   TODO Character.isFalling(): consider bottomContact ? try this on ramps.
    *   TODO Try sound error handling! (Safari etc.)
    *   TODO only mirror images where a mirrored SpriteTemplate exists! Prevent ALL images from being mirrored?
    *
    *   TODO Complete the MVP!
    *
    *   TODO Flip effect for tiles: https://desandro.github.io/3dtransforms/docs/card-flip.html
    *   TODO Add translucent overlay for blend effects.
    *   TODO Ability to smash crates or destroyables etc.
    *   TODO Particle fx smashed crates, startup window etc.
    *   TODO create class HUD and assign its non-static method paintHud?
    *   TODO Create HUD ( for items 1st ).
    *   TODO Create item pickup HUD effect!
    *   TODO Add tutorial notifiers?
    *   TODO Parallax Fence in fg - solve parallax machanism for game decos. you must assume that every element has the exact width of the level!! try from middle of the level!
    *   TODO Fixed positioning for camera on first scene (player floating in).
    *
    *   TODO Add react for site content creation.
    *   TODO Step-Flow-Meter (progress, navi etc.) in React.
    *   TODO Try ant design (pro?) in front panel.
    *   TODO Add jest tests.
    *   TODO Add cucumber tests.
    *   TODO Credits with top npm packages, staff, colaborators, best tools, free 2d art, primal web references etc,
    *   TODO Test in all browsers.
    *   TODO Create mobile version .. (minimum panel size and minimum canvas size 400px etc )
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
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
            ninjas.Debug.init.log( ninjas.SettingGame.TITLE );
            ninjas.Debug.init.log();

            //init and start the game engine
            Main.game = new ninjas.Game();
            Main.game.init();
        }
    }
