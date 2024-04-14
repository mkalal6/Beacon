import React, { useState } from 'react';
import { Client, Wallet, xrpToDrops, getBalanceChanges } from 'xrpl';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min';



function Transactions() {
  const [net, setNet] = useState("wss://s.altnet.rippletest.net:51233");
  const [standbyAccount, setStandbyAccount] = useState('');
  const [standbySeed, setStandbySeed] = useState('');
  const [standbyBalance, setStandbyBalance] = useState('');
  const [standbyAmount, setStandbyAmount] = useState('');
  const [standbyDestination, setStandbyDestination] = useState('');
  const [standbyResult, setStandbyResult] = useState('');

  const [operationalAccount, setOperationalAccount] = useState('');
  const [operationalSeed, setOperationalSeed] = useState('');
  const [operationalBalance, setOperationalBalance] = useState('');
  const [operationalAmount, setOperationalAmount] = useState('');
  const [operationalDestination, setOperationalDestination] = useState('');
  const [operationalResult, setOperationalResult] = useState('');
  const [seeds, setSeeds] = useState('');
  const [logs, setLog] = useState('');

  const handleRadioChange = (e) => {
    setNet(e.target.value);
  };

  const handleSeedsChange = (e) => {
    setSeeds(e.target.value);
  };
  const getAccountsFromSeeds = async () => {
    const client = new Client(net);
    let logs = 'Connecting to ' + net + '....';
    setLog(logs);
    try {
        await client.connect();
        logs += '\nConnected, finding wallets.\n';
        setLog(logs);

        var lines = seeds.split('\n').map(line => line.trim());
        if (lines.length < 2) {
            throw new Error("Invalid seeds. Please ensure you have entered two valid seeds.");
        }
        const standbyWallet = Wallet.fromSeed(lines[0]);
        const operationalWallet = Wallet.fromSeed(lines[1]);

        const standbyBalance = await client.getXrpBalance(standbyWallet.address);
        const operationalBalance = await client.getXrpBalance(operationalWallet.address);

        setStandbyAccount({
            address: standbyWallet.address,
            seed: standbyWallet.seed,
            balance: standbyBalance
        });

        setOperationalAccount({
            address: operationalWallet.address,
            seed: operationalWallet.seed,
            balance: operationalBalance
        });

        logs += `Standby Account: ${standbyWallet.address}, Balance: ${standbyBalance}\n`;
        logs += `Operational Account: ${operationalWallet.address}, Balance: ${operationalBalance}`;
        setLog(logs);
    } catch (error) {
        console.error('Error handling seeds:', error);
        setLog(prevLogs => prevLogs + '\nError: ' + error.message);
    } finally {
        await client.disconnect();
    }
};

  const connectAndSetupWallet = async (type) => {
    const client = new Client(net);
    try {
      await client.connect();
      const { wallet } = await client.fundWallet();
      const balance = await client.getXrpBalance(wallet.address);
      const updateFields = type === 'standby' ? {
        setAccount: setStandbyAccount,
        setSeed: setStandbySeed,
        setBalance: setStandbyBalance,
        setResult: setStandbyResult
      } : {
        setAccount: setOperationalAccount,
        setSeed: setOperationalSeed,
        setBalance: setOperationalBalance,
        setResult: setOperationalResult
      };

      updateFields.setAccount(wallet.address);
      updateFields.setSeed(wallet.seed);
      updateFields.setBalance(balance);
      updateFields.setResult(`Account created. Address: ${wallet.address}, Balance: ${balance}`);
    } catch (error) {
      console.error('Error connecting to the XRPL network:', error);
    } finally {
      await client.disconnect();
    }
  };

  const sendXRP = async (fromType) => {
    const fromWalletDetails = fromType === 'standby' ? {
      seed: standbySeed,
      amount: standbyAmount,
      destination: standbyDestination,
      setResult: setStandbyResult,
      setBalance: setStandbyBalance
    } : {
      seed: operationalSeed,
      amount: operationalAmount,
      destination: operationalDestination,
      setResult: setOperationalResult,
      setBalance: setOperationalBalance
    };

    const client = new Client(net);
    try {
      await client.connect();
      const wallet = Wallet.fromSeed(fromWalletDetails.seed);
      const prepared = await client.autofill({
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: xrpToDrops(fromWalletDetails.amount),
        Destination: fromWalletDetails.destination
      });
      const signed = wallet.sign(prepared);
      const response = await client.submitAndWait(signed.tx_blob);
      const changes = getBalanceChanges(response.result.meta);
      fromWalletDetails.setResult(`Transaction completed. Changes: ${JSON.stringify(changes)}`);
      const newBalance = await client.getXrpBalance(wallet.address);
      fromWalletDetails.setBalance(newBalance);
    } catch (error) {
      console.error('Error sending XRP:', error);
    } finally {
      await client.disconnect();
    }
  };

  return (
    <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="mb-4">Transaction(s)</h1>
                    <p>Choose your ledger instance:</p>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="radio" id="tn" name="server" value="wss://s.altnet.rippletest.net:51233" checked={net === "wss://s.altnet.rippletest.net:51233"} onChange={handleRadioChange} />
                        <label className="form-check-label" htmlFor="testnet">Testnet</label>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="radio" id="dn" name="server" value="wss://s.devnet.rippletest.net:51233" checked={net === "wss://s.devnet.rippletest.net:51233"} onChange={handleRadioChange} />
                        <label className="form-check-label" htmlFor="devnet">Devnet</label>
                    </div>
                    <textarea className="form-control mb-3" value={logs} rows="10" placeholder="Logs will appear here..."></textarea>
                    <div className="d-flex justify-content-between mb-4">
                        <button className="btn btn-primary me-2" onClick={() => connectAndSetupWallet('standby')}>Refresh</button>
                        <button className="btn btn-success" onClick={() => getAccountsFromSeeds()}>Retrieve Accounts from Seeds</button>
                    </div>
                    <div className="row">
        <div className="col-md-7 mb-5">
            <div className="p-3 border bg-light">
                <h5>Your Account Details</h5>
                <p>Account: {standbyAccount}</p>
                <p>Seed: {standbySeed}</p>
                <p>Balance: {standbyBalance}</p>
                <button className="btn btn-info" onClick={() => sendXRP('standby')}>Send XRP from Standby</button>
                <textarea className="form-control mt-2" value={standbyResult} readOnly />
            </div>
        </div>
    </div>
                </div>
                
                <div className="col-md-6">
                    <h1>Transaction History</h1>
                    <div className="accordion" id="transactionAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Transaction 1
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                                <div className="accordion-body">
                                    Recieved $100 to ABC Corp.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Transaction 2
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
                                <div className="accordion-body">
                                    Received $150 from XYZ Inc.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Transaction 3
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree">
                                <div className="accordion-body">
                                  Recieved $200 to 123 LLC.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
  );
}

export default Transactions;
