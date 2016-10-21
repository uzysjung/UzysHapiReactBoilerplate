/**
 * Created by uzysjung on 2016. 10. 20..
 */
import React from 'react';
import PageWrapper from '../../components/page/PageWrapper'
import PageHeader from '../../components/page/PageHeader'
import PageContent from '../../components/page/PageContent'
import Box from '../../components/widget/Box'
import Pkg from '../../../../package.json'

export default function HomePage() {
    return (
        <PageWrapper>
            <PageHeader
                title="Home"
                description="UzysHapiReactBoilerplate"
            >
            </PageHeader>
            <PageContent>
                <Box
                    title="Welcome"
                    status="primary"
                    expandable
                    removable
                >
                    UzysHapiReactBoilerplate Version {Pkg.version}
                </Box>


            </PageContent>
        </PageWrapper>
    );
}
