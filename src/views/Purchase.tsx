import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import ReactGA from 'react-ga4';

function PaymentCards() {
    const [hover, setHover] = useState(false);
    const [showBitcoin, setShowBitcoin] = useState(false);
    const bitcoinAddress = "bc1q6r0l549jefv3rgs7e0jzsdkx9pq9trd2cqyw50"
    const dl_link = "https://onedrive.live.com/download?cid=A3B69BDCC03E82A9&resid=A3B69BDCC03E82A9%21111289&authkey=AEftpEpz8jxnBdI"

    // Function to handle GA event
    const handleGAEvent = (category, action, label) => {
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        });
    };

    const goToLink = (link, label = 'Download Link') => {
        handleGAEvent('Payment Options', 'click', label); // Track clicks with GA
        window.location.href = link;
    };

    const handleCopy = () => {
        handleGAEvent('Payment Options', 'copy', 'Bitcoin Address Copied'); // Track Bitcoin address copy with GA
        setShowBitcoin(!showBitcoin);
    };

    return (
        <><br />
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {/* <div className="shadow-lg p-0 mb-2 bg-white rounded"> */}
                        <div className="card shadow-lg rounded custom-card-size">
                            <div className="card-body">
                                <div> Free</div>
                                <div> Version </div>
                                <div><Button onClick={() => goToLink('/strategyeditor')}
                                    variant="contained">Try it</Button>
                                </div>
                                <div className="items">
                                    <ul><br />
                                        <li>Stream races delayed</li>
                                        <li>Create Strategies</li>
                                        <li>Place hypothetical dummy bets to evaluate strategy</li>
                                        <li>Analyze results</li>
                                        <br />

                                    </ul>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card shadow-lg rounded custom-card-size">
                            <div className="card-body">
                                <div> Monthly</div>
                                <div> $25 / month </div>
                                <div><Button onClick={() => goToLink('https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-910576034F790373KMC6UZOQ')}
                                    variant="contained">Subscribe</Button>
                                </div>
                                <div className="items">
                                    <ul><br />
                                        <li>Stream races in real time</li>
                                        <li>Create Strategies</li>
                                        <li>Place hypothetical dummy bets to evaluate strategy</li>
                                        <li>Analyze results</li>
                                        <br />

                                        <li>Support chat</li>
                                        <li>Access to all strategies</li>
                                        <li>Edit strategies</li>
                                        <li>Create custom strategies</li>
                                        <br />
                                        <li>Get free licence to deepermind-pokerbot.com </li>
                                    </ul>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card shadow-lg rounded custom-card-size">
                            <div className="card-body">
                                <div> 1 year</div>
                                <div> $49 / year </div>
                                <div>
                                    <Button onClick={() => goToLink('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YZUR8CYZB826S')}
                                        variant="contained">Buy</Button>
                                </div>
                                <div className="items">
                                    <ul><br />
                                        <li>Stream races in real time</li>
                                        <li>Create Strategies</li>
                                        <li>Place hypothetical dummy bets to evaluate strategy</li>
                                        <li>Analyze results</li>
                                        <br />

                                        <li>Support chat</li>
                                        <li>Access to all strategies</li>
                                        <li>Edit strategies</li>
                                        <li>Create custom strategies</li>
                                        <br />
                                        <li>Get free licence to deepermind-pokerbot.com </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card shadow-lg rounded custom-card-size">
                            <div className="card-body">
                                <div> 1 year</div>
                                <div> $49 / year </div>
                                <div>
                                    <ClickAwayListener onClickAway={() => setHover(false)}>
                                        <Button
                                            onMouseEnter={() => setHover(true)}
                                            onMouseLeave={() => setHover(false)}
                                            onClick={handleCopy}
                                            variant="contained"
                                        >
                                            Bitcoin
                                        </Button>
                                    </ClickAwayListener>
                                    {showBitcoin &&
                                        <div className="small">
                                            Bitcoin address: {bitcoinAddress} <br />Please email me to confirm once you have made a payment: dickreuter@gmail.com
                                        </div>
                                    }

                                </div>
                                {/* <div className="small"><br/>Bitcoin: bc1q6r0l549jefv3rgs7e0jzsdkx9pq9trd2cqyw50</div> */}
                                <div className="items">
                                    <ul><br />
                                        <li>Stream races in real time</li>
                                        <li>Create Strategies</li>
                                        <li>Place hypothetical dummy bets to evaluate strategy</li>
                                        <li>Analyze results</li>
                                        <br />

                                        <li>Support chat</li>
                                        <li>Access to all strategies</li>
                                        <li>Edit strategies</li>
                                        <li>Create custom strategies</li>
                                        <br />
                                        <li>Get free licence to deepermind-pokerbot.com </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card shadow-lg rounded custom-card-size">
                            <div className="card-body">
                                <div> Lifetime</div>
                                <div> $499 / life </div>
                                <div>
                                    <Button onClick={() => goToLink('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PQX6RA3CEEED6')}
                                        variant="contained">Buy</Button>
                                </div>
                                <div className="items">
                                    <ul><br />
                                        <li>Stream races in real time</li>
                                        <li>Create Strategies</li>
                                        <li>Place hypothetical dummy bets to evaluate strategy</li>
                                        <li>Analyze results</li>
                                        <br />

                                        <li>Support chat</li>
                                        <li>Access to all strategies</li>
                                        <li>Edit strategies</li>
                                        <li>Create custom strategies</li>
                                        <br />
                                        <li>Get free licence to deepermind-pokerbot.com </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentCards