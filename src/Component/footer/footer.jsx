import React from 'react';
import './footer.scss'

export default class Footer extends React.Component {
    render() {
        return (
            <section className="footer">
                <p>Copyright © 2019 Covance Inc. All rights reserved.</p>
                <div className="footer-logo"></div>
            </section>
        )
    }
}