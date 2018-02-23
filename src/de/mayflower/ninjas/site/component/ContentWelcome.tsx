
    import * as ninjas from '../../ninjas';
    import * as antd   from 'antd';
    import * as React  from 'react';

    /*******************************************************************************************************************
    *   A react component with the content for the 'welcome' page.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    export class ContentWelcome extends React.Component<any, any>
    {
        /***************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        render() : JSX.Element
        {
            ninjas.Debug.react.log( "ContentWelcome.render() being invoked" );

            return <div>

                { ninjas.SiteContentFactory.createStepIndicator( 0 ) }

                <antd.Divider />

                { ninjas.SiteContentFactory.createImage( ninjas.SettingEngine.PATH_IMAGE_SITE + "logo.png" ) }

                <antd.Divider />

                { ninjas.SiteContentFactory.createHeadline( "Welcome!" ) }

                { ninjas.SiteContentFactory.createParagraph( "Bavaria ipsum dolor sit amet Schaung kost nix Xaver, Almrausch. Des basd scho und glei wirds no fui lustiga Hetschapfah Ramasuri aasgem Sauakraud fias Schorsch o’ha Woibbadinga. Sauakraud schaugn i vo de! So in da greana Au Watschnpladdla mim Radl foahn allerweil i mechad dee Schwoanshaxn jo mei kimmt sauba, gwiss! Wurschtsolod jo leck mi vui und." ) }

                <antd.Divider />

                <antd.Tooltip
                    placement="leftBottom"
                    title="Generate and download a new key pair."
                >
                    <antd.Button
                        type="primary"
                        className="backend"
                        icon="key"
                        loading={ false }
                        onClick={ () => { alert( "Button clicked!" ); } }
                        style={ { marginBottom: "35px", } }
                    >
                        Generate new RSA 2048 bit key pair
                    </antd.Button>
                </antd.Tooltip>

                <antd.Divider />

                <antd.Switch
                    checkedChildren={   <antd.Icon type="notification" /> }
                    unCheckedChildren={ <antd.Icon type="poweroff" /> }
                    defaultChecked={ true }
                    onChange={ ( checked:boolean ) => { console.log( "Toggle to checked [" + checked + "]" ); } }
                />

                <antd.Divider />






            </div>
        }
    }
