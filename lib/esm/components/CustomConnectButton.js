var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDispatch, useSelector } from 'react-redux';
import { activateToast } from '../store/toastsSlice';
import inIframe from '../lib/inIframe';
function CustomConnectButton(props) {
    var _a = useState(false), copied = _a[0], setCopied = _a[1];
    var typeOfQuery = useSelector(function (store) { return store.typeOfQuery; });
    var dispatch = useDispatch();
    if (inIframe()) {
        if (!copied) {
            return React.createElement("button", { onClick: function () {
                    dispatch(activateToast({ message: "Copy link to visit full app: https://console.tableland.xyz", type: "success" }));
                } }, "Get link to full app");
        }
        else {
            return React.createElement("button", null, "Now paste in \uD83D\uDD0E bar");
        }
    }
    return (React.createElement(ConnectButton.Custom, null, function (_a) {
        var account = _a.account, chain = _a.chain, openAccountModal = _a.openAccountModal, openChainModal = _a.openChainModal, openConnectModal = _a.openConnectModal, authenticationStatus = _a.authenticationStatus, mounted = _a.mounted;
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        var ready = mounted && authenticationStatus !== 'loading';
        var connected = ready &&
            account &&
            chain &&
            (!authenticationStatus ||
                authenticationStatus === 'authenticated');
        return (React.createElement("div", __assign({}, (!ready && {
            'aria-hidden': true,
            'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
            },
        })), (function () {
            var _a;
            if (!connected) {
                return (React.createElement("button", { onClick: openConnectModal, type: "button" }, "Connect"));
            }
            if (chain.unsupported) {
                return (React.createElement("button", { onClick: openChainModal, type: "button" }, "Wrong network"));
            }
            return (React.createElement("div", { style: { display: 'flex' }, className: "grouped-buttons" },
                React.createElement("button", { onClick: openChainModal, style: { display: 'flex', alignItems: 'center' }, type: "button" },
                    chain.hasIcon && (React.createElement("div", { style: {
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                        } }, chain.iconUrl && (React.createElement("img", { alt: (_a = chain.name) !== null && _a !== void 0 ? _a : 'Chain icon', src: chain.iconUrl, style: { width: 12, height: 12 } })))),
                    chain.name),
                React.createElement("button", { onClick: openAccountModal, type: "button" },
                    account.displayName,
                    account.displayBalance
                        ? " (".concat(account.displayBalance, ")")
                        : '')));
        })()));
    }));
}
export default CustomConnectButton;
