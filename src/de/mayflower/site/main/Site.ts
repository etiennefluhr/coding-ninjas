
    require( "animate.css" );

    import * as ninjas from '../../ninjas/ninjas';
    import * as site   from '../site';

    /*******************************************************************************************************************
    *   Manages the communication between the game and the company presentation.
    *
    *   TODO outsource according functions to SitePopup.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Site
    {
        /** The border size of the site popup in px. */
        private     static  readonly    POPUP_BORDER_SIZE       :number                     = 15;
        /** The background color of the site popup . */
        private     static  readonly    POPUP_BG_COLOR          :string                     = "rgba( 255, 255, 255, 0.25 )";

        /** An example site popup. */
        private     static              examplePopup            :HTMLDivElement             = null;

        /*****************************************************************************
        *   Being invoked when a popup shall be shown.
        *****************************************************************************/
        public static showPopup() : void
        {
            ninjas.Debug.site.log( "Site.showPopup() being invoked" );

            // TODO move creation to init method!
            if ( Site.examplePopup == null )
            {
                Site.createPopup();
                document.body.appendChild( Site.examplePopup );
            }

            Site.examplePopup.className = "animated bounceInLeft";
        }

        /*****************************************************************************
        *   Being invoked when a popup shall be hidden.
        *****************************************************************************/
        public static hidePopup() : void
        {
            ninjas.Debug.site.log( "Site.hidePopup() being invoked" );

            // document.body.removeChild( Site.examplePopup )

            Site.examplePopup.className = "animated bounceOutLeft";
        }

        /*****************************************************************************
        *   Creates the site popup.
        *****************************************************************************/
        private static createPopup() : void
        {
            Site.examplePopup = document.createElement( "div" );

            Site.examplePopup.style.width  = ( ninjas.Main.game.canvasWidth  / 2 - Site.POPUP_BORDER_SIZE ) + "px";
            Site.examplePopup.style.height = ( ninjas.Main.game.canvasHeight - 2 * Site.POPUP_BORDER_SIZE ) + "px";

            Site.examplePopup.style.backgroundColor = Site.POPUP_BG_COLOR;

            Site.examplePopup.style.position = "absolute";
            Site.examplePopup.style.top  = Site.POPUP_BORDER_SIZE + "px";
            Site.examplePopup.style.left = Site.POPUP_BORDER_SIZE + "px";
        }
    }
