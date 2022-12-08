import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store'
import { activateToast } from '../store/toastsSlice';


function inIframe () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}


function CustomConnectButton(props) {

  const [copied, setCopied] = useState(false);
  const typeOfQuery = useSelector((store: RootState)=>store.typeOfQuery)
  const dispatch = useDispatch();


  if(!copied) {
      return <button onClick={() => {
        navigator.clipboard.writeText("https://console.tableland.xyz");
        dispatch(activateToast({message: `Copied: https://console.tableland.xyz`, type: "success"}));
        setCopied(true);
      }}>📋 Copy link to full app</button>      
  } else {
    return <button>Now paste in 🔎 bar</button>
  } 



    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button">
                      Connect
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }
  
                return (
                  <div style={{ display: 'flex' }} className="grouped-buttons">
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
  
                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  
}
export default CustomConnectButton;
