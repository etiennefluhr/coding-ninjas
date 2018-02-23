
    import * as ninjas from '../../ninjas';
    import * as antd   from 'antd';
    import * as React  from 'react';

    /*******************************************************************************************************************
    *   A react component with the content for the 'company' page.
    *
    *   @author  Christopher Stock
    *   @version 1.0
    *******************************************************************************************************************/
    export class ContentCompany extends React.Component<any, any>
    {
        /***************************************************************************************************************
        *   Being invoked every time this component renders.
        *
        *   @return The rendered JSX.
        ***************************************************************************************************************/
        render() : JSX.Element
        {
            ninjas.Debug.react.log( "ContentCompany.render() being invoked" );

            return <div>

                { ninjas.SiteContentFactory.createStepIndicator( 1 ) }
                { ninjas.SiteContentFactory.createDivider() }
                { ninjas.SiteContentFactory.createImage( ninjas.SettingEngine.PATH_IMAGE_SITE + "logo.png" ) }
                { ninjas.SiteContentFactory.createSpacerVertical() }
                { ninjas.SiteContentFactory.createHeadline( "Our Company" ) }
                { ninjas.SiteContentFactory.createSpacerVertical() }
                { ninjas.SiteContentFactory.createParagraph( "Our company is ..." ) }
                { ninjas.SiteContentFactory.createSpacerVertical() }

                <antd.Carousel effect="fade" autoplay={ true } autoplaySpeed={ 3000 } >
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </antd.Carousel>

                <antd.Progress type="circle" percent={ 83.5 } />

            </div>
        }
    }
