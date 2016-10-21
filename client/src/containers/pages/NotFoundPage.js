/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React from 'react'
import './NotFoundPage.css'
import PageContent from '../../components/page/PageContent';

export default function NotFoundPage() {
    return (
        <PageContent>
            <div className="error-page">
                <h2 className="headline text-yellow"> 404</h2>

                <div className="error-content">
                    <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>

                    <p>
                        We could not find the page you were looking for.
                        Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
                    </p>

                </div>
            </div>
        </PageContent>
    );
}
