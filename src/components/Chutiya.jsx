import React from 'react';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // If you have additional JS to load, it can be adapted here
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/xrpl@2.7.0/build/xrpl-latest-min.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function getNet() {
    let net
    if (document.getElementById("tn").checked) net = "wss://s.altnet.rippletest.net:51233"
    if (document.getElementById("dn").checked) net = "wss://s.devnet.rippletest.net:51233"
    return net
  } // End of getNet()

  // Handlers for form actions
  async function getAccountsFromSeeds() {
    let net = getNet()
    const client = new xrpl.Client(net)
    results = 'Connecting to ' + getNet() + '....'
    standbyResultField.value = results
    await client.connect()
    results += '\nConnected, finding wallets.\n'
    standbyResultField.value = results
        
  // -------------------------------------------------Find the test account wallets.    
    var lines = seeds.value.split('\n')
    const standby_wallet = xrpl.Wallet.fromSeed(lines[0])
    const operational_wallet = xrpl.Wallet.fromSeed(lines[1])
        
  // -------------------------------------------------------Get the current balance.
    const standby_balance = (await client.getXrpBalance(standby_wallet.address))  
    const operational_balance = (await client.getXrpBalance(operational_wallet.address))  
          
  // ----------------------Populate the fields for Standby and Operational accounts.
    standbyAccountField.value = standby_wallet.address
    standbySeedField.value = standby_wallet.seed
    standbyBalanceField.value = (await client.getXrpBalance(standby_wallet.address))
        
    operationalAccountField.value = operational_wallet.address
    operationalSeedField.value = operational_wallet.seed
    operationalBalanceField.value = (await client.getXrpBalance(operational_wallet.address))
        
    client.disconnect()
              
  } // End of getAccountsFromSeeds()

  const getAccount = (type) => {
    // Implement functionality or call external JS functions here
  };

  const sendXRP = () => {
    // Implement functionality or call external JS functions here
  };

  return (
    <div style={{ fontFamily: 'Work Sans, sans-serif', padding: 20, background: '#fafafa' }}>
      <h1>Token Test Harness</h1>
      <form id="theForm">
        Choose your ledger instance:
        &nbsp;&nbsp;
        <input type="radio" id="tn" name="server" value="wss://s.altnet.rippletest.net:51233" defaultChecked />
        <label htmlFor="testnet">Testnet</label>
        &nbsp;&nbsp;
        <input type="radio" id="dn" name="server" value="wss://s.devnet.rippletest.net:51233" />
        <label htmlFor="devnet">Devnet</label>
        <br/><br/>
        <button type="button" onClick={getAccountsFromSeeds()}>Get Accounts From Seeds</button>
        <br/>
        <textarea id="seeds" cols="40" rows="2"></textarea>
        <br/><br/>
        <div>
          <div>
            <button type="button" onClick={() => getAccount('standby')}>Get New Standby Account</button>
            <div>
              <div style={{ textAlign: 'left' }}>
                Standby Account
                <input type="text" id="standbyAccountField" size="40" />
              </div>
              <div style={{ textAlign: 'left' }}>
                Seed
                <input type="text" id="standbySeedField" size="40" />
              </div>
              <div style={{ textAlign: 'left' }}>
                XRP Balance
                <input type="text" id="standbyBalanceField" size="40" />
              </div>
              <div style={{ textAlign: 'left' }}>
                Amount
                <input type="text" id="standbyAmountField" size="40" />
              </div>
              <div style={{ textAlign: 'left' }}>
                Destination
                <input type="text" id="standbyDestinationField" size="40" />
              </div>
            </div>
            <textarea id="standbyResultField" cols="80" rows="20"></textarea>
          </div>
          <div>
            <button type="button" onClick={sendXRP}>Send XRP &gt;</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;