
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

        /** Flags if a panel is currently shown. */
        private                 panelPosition                   :ninjas.SitePanelPosition   = ninjas.SitePanelPosition.NONE;

        /** The current width of the panel. */
        private                 panelWidth                      :number                     = 0;

        /*****************************************************************************
        *   Being invoked when a site shall be shown.
        *
        *   @return If showing the site succeeded.
        *****************************************************************************/
        public show( position:ninjas.SitePanelPosition ) : boolean
        {
            ninjas.Debug.site.log( "Showing site panel" );

            if ( this.animationInProgress )
            {
                ninjas.Debug.site.log( "Animation currently running - canceling show" );
                return false;
            }
            this.animationInProgress = true;
            this.panelPosition       = position;

            this.currentPanel = ninjas.SiteContent.createExampleContent();

            if ( this.panelPosition == ninjas.SitePanelPosition.LEFT )
            {
                this.currentPanel.className = "wow bounceInLeft";
            }
            else
            {
                this.currentPanel.className = "wow bounceInRight";
            }

            document.body.appendChild( this.currentPanel );
            this.updatePanelSizeAndPosition();

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
            ninjas.Debug.site.log( "Hiding site panel" );

            if ( this.animationInProgress )
            {
                ninjas.Debug.site.log( "Animation currently running - canceling hide" );
                return false;
            }
            this.animationInProgress = true;

            if ( this.panelPosition == ninjas.SitePanelPosition.LEFT )
            {
                this.currentPanel.className = "wow bounceOutLeft";
            }
            else
            {
                this.currentPanel.className = "wow bounceOutRight";
            }

            this.panelPosition = ninjas.SitePanelPosition.NONE;

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
        public updatePanelSizeAndPosition()
        {
            if ( this.currentPanel != null )
            {
                this.panelWidth = ( ninjas.Main.game.canvasWidth  / 2 - ninjas.Setting.SITE_BORDER_SIZE );
                if ( this.panelWidth > ninjas.Setting.SITE_PANEL_MAX_WIDTH )
                {
                    this.panelWidth = ninjas.Setting.SITE_PANEL_MAX_WIDTH;
                }

                this.currentPanel.style.width  = this.panelWidth + "px";
                this.currentPanel.style.height = ( ninjas.Main.game.canvasHeight - 2 * ninjas.Setting.SITE_BORDER_SIZE ) + "px";

                if ( this.panelPosition == ninjas.SitePanelPosition.LEFT )
                {
                    this.currentPanel.style.left = ninjas.Setting.SITE_BORDER_SIZE + "px";
                }
                else
                {
                    this.currentPanel.style.left = ( ninjas.Main.game.canvasWidth - this.panelWidth - ninjas.Setting.SITE_BORDER_SIZE ) + "px";
                }

                // TODO to own reference in class Site! remove id!
                let siteContainer:HTMLDivElement = document.getElementById( "siteContainer" ) as HTMLDivElement;
                siteContainer.style.width  = ( this.panelWidth - 2 * ninjas.Setting.SITE_BORDER_SIZE ) + "px";
            }
        }

        /*****************************************************************************
        *   Determines if a site panel is currently active.
        *
        *   @return <code>true</code> if a site panel is currently active.
        *****************************************************************************/
        public getFixedCameraTargetX() : number
        {
            switch ( this.panelPosition )
            {
                case ninjas.SitePanelPosition.NONE:
                {
                    return -1;
                }

                case ninjas.SitePanelPosition.LEFT:
                {
                    let panelAndBorderWidth:number = this.panelWidth + ninjas.Setting.SITE_BORDER_SIZE;

                    return ( panelAndBorderWidth + ( ( ninjas.Main.game.canvasWidth - panelAndBorderWidth ) / 2 ) );
                }

                case ninjas.SitePanelPosition.RIGHT:
                {
                    let panelAndBorderWidth:number = this.panelWidth + ninjas.Setting.SITE_BORDER_SIZE;

                    return ( ( ninjas.Main.game.canvasWidth - panelAndBorderWidth ) / 2 );
                }
            }
        }
    }