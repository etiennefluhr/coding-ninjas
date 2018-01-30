
    require( "animate.css" );

    import * as ninjas from '../../ninjas';

    /*******************************************************************************************************************
    *   Manages the communication between the game and the company presentation.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class SiteSystem
    {
        /** The current site panel. */
        private                 currentPanel                    :HTMLDivElement             = null;

        /** Flags if an animation is currently active. */
        private                 animationInProgress             :boolean                    = null;

        /*****************************************************************************
        *   Being invoked when a site shall be shown.
        *
        *   @return If showing the site succeeded.
        *****************************************************************************/
        public show() : boolean
        {
            ninjas.Debug.site.log( "Site.showPopup() being invoked" );

            if ( this.animationInProgress )
            {
                ninjas.Debug.site.log( "Denied showing site - animation currently running" );
                return false;
            }
            this.animationInProgress = true;

            this.currentPanel = ninjas.SiteContent.createExampleContent();
            document.body.appendChild( this.currentPanel );
            this.updatePanelSize();

            ninjas.Main.game.wowSystem.sync();

            window.setTimeout(
                () => {

                    this.animationInProgress = false;
                },
                1000
            );

            return true;
        }

        /*****************************************************************************
        *   Being invoked when a site shall be hidden.
        *
        *   @return If hiding the site succeeded.
        *****************************************************************************/
        public hide() : boolean
        {
            ninjas.Debug.site.log( "Site.hidePopup() being invoked" );

            if ( this.animationInProgress )
            {
                ninjas.Debug.site.log( "Denied hiding site - animation currently running" );
                return false;
            }
            this.animationInProgress = true;

            this.currentPanel.className = "wow bounceOutLeft";
            ninjas.Main.game.wowSystem.sync();

            window.setTimeout(
                () => {
                    this.currentPanel.remove();
                    this.currentPanel = null;

                    this.animationInProgress = false;
                },
                750
            );

            return true;
        }

        /*****************************************************************************
        *   Being invoked when the panel size should be set according to the current canvas size.
        *****************************************************************************/
        public updatePanelSize()
        {
            if ( this.currentPanel != null )
            {
                // TODO clip max panel size!

                this.currentPanel.style.width  = ( ninjas.Main.game.canvasWidth  / 2 - ninjas.Setting.SITE_BORDER_SIZE ) + "px";
                this.currentPanel.style.height = ( ninjas.Main.game.canvasHeight - 2 * ninjas.Setting.SITE_BORDER_SIZE ) + "px";

                // TODO to own reference! remove id!
                let siteContainer:HTMLDivElement = document.getElementById( "siteContainer" ) as HTMLDivElement;
                siteContainer.style.width  = ( ninjas.Main.game.canvasWidth  / 2 - 3 * ninjas.Setting.SITE_BORDER_SIZE ) + "px";
            }
        }
    }
