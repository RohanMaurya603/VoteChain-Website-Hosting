import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getAllRegisteredUser, verifyVoter } from '../services/operations/RegistrationAPI';
// const contractArtifact = require("contracts/Contract.json");
import contractArtifact from '../contracts/Contract.json';



const web3Context = createContext();

const Web3Provider = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    const [contract, setContract] = useState(null);
    const [connect,setConnect] = useState(false);
    const [address, setAddress] = useState(null);
    const [instance, setInstance] = useState(null);
    const [electionState,setElectionState] = useState(null);
    const [candidates,setCandidates] = useState([]);
    const [winner,setWinner] = useState(null);

    useEffect(() => {
        const loadDataFromLocalStorage = () => {
            const savedAddress = localStorage.getItem('userAddress');
            const savedContract = localStorage.getItem('contractAddress');
            const savedPhase = localStorage.getItem('electionPhase');

            if (savedAddress && savedContract && savedPhase) {
                setAddress(savedAddress);
                setContract(savedContract);
                const web3 = new Web3(window.ethereum);
                const contractInstance = new web3.eth.Contract(
                    contractArtifact.abi,
                    savedContract
                );
                setInstance(contractInstance);
                setElectionState(Number(savedPhase));
            }
        };

        loadDataFromLocalStorage();
        //fetchElectionState();
    }, []);

    const connectWeb3Metamask = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            setAddress(userAddress);
            localStorage.setItem('userAddress', userAddress);

            const networkId = await web3.eth.net.getId();
            const networkData = contractArtifact.networks[networkId];
            const contractAddress = networkData.address;
            setContract(contractAddress);
            localStorage.setItem('contractAddress', contractAddress);

            const contractInstance = new web3.eth.Contract(
                contractArtifact.abi,
                contractAddress
            );
            setInstance(contractInstance);
            setConnect(true);
            localStorage.setItem('connect',true);
            fetchElectionState();

        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            toast.error("Error Connecting to Metamask !")
        }
    };

    const addCandidate = async (name, party, age, qualification, image) => {
        try {
            // Fetch data from local storage
            const savedAddress = localStorage.getItem('userAddress');
            const savedContract = localStorage.getItem('contractAddress');
            // const savedProvider = localStorage.getItem('provider');
    
            if (!savedAddress || !savedContract ) {
                console.error('User address, contract address, or provider not found in local storage.');
                return;
            }
    
            // Set state variables
            setAddress(savedAddress);
            setContract(savedContract);
            // setProvider(savedProvider);
    
            // Initialize Web3 provider
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(
                contractArtifact.abi,
                savedContract
            );

            console.log("ADDDDDDDDDDDDD");
    
            // Get transaction data
            const txData = contractInstance.methods.addContestant(
                name, party, age, qualification, image
            ).encodeABI();
    
            // Get nonce and gas price
            const nonce = await web3.eth.getTransactionCount(savedAddress);
            const gasPrice = await web3.eth.getGasPrice();
    
            // Construct transaction object
            const txObject = {
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: web3.utils.toHex(3000000),
                to: savedContract,
                data: txData,
                from: savedAddress
            };
    
            // Send transaction
            await web3.eth.sendTransaction(txObject)
            .on('transactionHash', (hash) => {
                console.log('Transaction Hash:', hash);
                alert('Transaction submitted. Transaction hash: ' + hash);
            })
            .on('receipt', (receipt) => {
                console.log('Transaction Receipt:', receipt);
            })
            .on('error', (error) => {
                console.error('Transaction Error:', error);
                alert('Transaction failed: ' + error.message);
            });

        } catch (err) {
            alert("Only Admin Can Add Candidates");
            console.error(err);
        }
    }

    const fetchElectionState = async () => {
        try {
            //const savedPhase = localStorage.getItem('electionPhase');

            // if(savedPhase == null){
                const savedContract = localStorage.getItem('contractAddress');
                const web3 = new Web3(window.ethereum);
                const contractInstance = new web3.eth.Contract(
                    contractArtifact.abi,
                    savedContract
                );
                const phase = await contractInstance.methods.state().call(); 
                console.log("Phase" ,phase);
                localStorage.setItem("electionPhase",phase.toString());
                setElectionState(Number(phase));
            // }
        } catch (error) {
            console.error('Error fetching election state:', error);
        }
    };

    const changePhaseofElection = async () => {
        try{
            // Fetch data from local storage
            const savedAddress = localStorage.getItem('userAddress');
            const savedContract = localStorage.getItem('contractAddress');
            // const savedProvider = localStorage.getItem('provider');
    
            if (!savedAddress || !savedContract ) {
                console.error('User address, contract address, or provider not found in local storage.');
                return;
            }
    
            // Set state variables
            setAddress(savedAddress);
            setContract(savedContract);
            // setProvider(savedProvider);
    
            // Initialize Web3 provider
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(
                contractArtifact.abi,
                savedContract
            );

            const newState = electionState + 1;
            console.log(newState);
    
            // Get transaction data
            const txData = contractInstance.methods.changeState(
                newState
            ).encodeABI();
    
            // Get nonce and gas price
            const nonce = await web3.eth.getTransactionCount(savedAddress);
            const gasPrice = await web3.eth.getGasPrice();
    
            // Construct transaction object
            const txObject = {
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: web3.utils.toHex(3000000),
                to: savedContract,
                data: txData,
                from: savedAddress
            };
    
            // Send transaction
            await web3.eth.sendTransaction(txObject)
            .on('transactionHash', (hash) => {
                console.log('Transaction Hash:', hash);
                localStorage.setItem('electionPhase',newState.toString());
                setElectionState(newState);
                alert('Transaction submitted. Transaction hash: ' + hash);
            })
            .on('receipt', (receipt) => {
                console.log('Transaction Receipt:', receipt);
            })
            .on('error', (error) => {
                console.error('Transaction Error:', error);
                alert('Transaction failed: ' + error.message);
            });
        }
        catch(error){
            alert("Only Admin Can Change the Election Phase");
            console.error(error);
        }
    }

    const registerVoterInSmartContract = async (address,dispatch) => {
        try{
             // Fetch data from local storage
            const savedAddress = localStorage.getItem('userAddress');
            const savedContract = localStorage.getItem('contractAddress');
            // const savedProvider = localStorage.getItem('provider');
    
            if (!savedAddress || !savedContract ) {
                console.error('User address, contract address, or provider not found in local storage.');
                return;
            }
    
            // Set state variables
            setAddress(savedAddress);
            setContract(savedContract);
            // setProvider(savedProvider);
    
            // Initialize Web3 provider
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(
                contractArtifact.abi,
                savedContract
            );

            console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIII");
    
            // Get transaction data
            const txData = contractInstance.methods.voterRegisteration(
                address
            ).encodeABI();
    
            // Get nonce and gas price
            const nonce = await web3.eth.getTransactionCount(savedAddress);
            const gasPrice = await web3.eth.getGasPrice();
    
            // Construct transaction object
            const txObject = {
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: web3.utils.toHex(3000000),
                to: savedContract,
                data: txData,
                from: savedAddress
            };
    
            // Send transaction
            await web3.eth.sendTransaction(txObject)
            .on('transactionHash', (hash) => {
                console.log('Transaction Hash:', hash);
                alert('Transaction submitted. Transaction hash: ' + hash);
            })
            .on('receipt', async(receipt) => {
                console.log('Transaction Receipt:', receipt);
                // Call verifyVoter in database if the transaction is successful
                if (receipt.status) {
                    try {
                        await dispatch(verifyVoter(token, address));
                        await dispatch(getAllRegisteredUser(token));
                    } catch (error) {
                        console.error('Error verifying voter:', error);
                    }
                }
            })
            .on('error', (error) => {
                console.error('Transaction Error:', error);
                alert('Transaction failed: ' + error.message);
            }); 
        }
        catch(error){
            alert("Voter Is Already Verified");
            console.error(error);
        }
    }

    const fetchCandidates = async () => {
        try {
            // Fetch data from local storage
            const savedContract = localStorage.getItem('contractAddress');
    
            if (!savedContract) {
                console.error('Contract address not found in local storage.');
                return;
            }
    
            setContract(savedContract);
    
            // Initialize Web3 provider
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(
                contractArtifact.abi,
                savedContract
            );
    
            // Get transaction data
            const allCandidates = await contractInstance.methods.getAllCandidates().call();
            console.log(allCandidates);
            setCandidates(allCandidates);
    
        } catch (error) {
            console.error('Error fetching Candidates :', error);
        }
    }

    const casteVote = async (candidateId) => {
        try{
            // Fetch data from local storage
            const savedAddress = localStorage.getItem('userAddress');
            const savedContract = localStorage.getItem('contractAddress');
            // const savedProvider = localStorage.getItem('provider');
    
            if (!savedAddress || !savedContract ) {
                console.error('User address, contract address, or provider not found in local storage.');
                return;
            }
    
            // Set state variables
            setAddress(savedAddress);
            setContract(savedContract);
            // setProvider(savedProvider);
    
            // Initialize Web3 provider
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(
                contractArtifact.abi,
                savedContract
            );

            // Get transaction data
            const txData = contractInstance.methods.vote(
                candidateId
            ).encodeABI();
    
            // Get nonce and gas price
            const nonce = await web3.eth.getTransactionCount(savedAddress);
            const gasPrice = await web3.eth.getGasPrice();
    
            // Construct transaction object
            const txObject = {
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: web3.utils.toHex(3000000),
                to: savedContract,
                data: txData,
                from: savedAddress
            };
    
            // Send transaction
            await web3.eth.sendTransaction(txObject)
            .on('transactionHash', (hash) => {
                console.log('Transaction Hash:', hash);
                alert('Transaction submitted. Transaction hash: ' + hash);
            })
            .on('receipt', (receipt) => {
                console.log('Transaction Receipt:', receipt);
            })
            .on('error', (error) => {
                console.error('Transaction Error:', error);
                alert('Transaction failed: ' + error.message);
            });
        }
        catch(error){
            console.log("Could Not The Vote : ",error);
            toast.error("Resgistration is Open.Go Register Yourself");

        }
    }
    
    const fetchWinner = async () => {
        try{
            const savedContract = localStorage.getItem('contractAddress');
            if (!savedContract) {
                console.error('Contract address not found in local storage.');
                return;
            }
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(
                contractArtifact.abi,
                savedContract
            );
            setContract(savedContract);
            const winnerCandidate = await contractInstance.methods.getElectionResult().call();
            console.log(winnerCandidate);
            setWinner(winnerCandidate);
        }
        catch(error){
            console.log("Error Fetching Winner Candidate : ",error);
        }
    }
    
    return (
        <web3Context.Provider
            value={{
                address,
                instance,
                contract,
                electionState,
                candidates,
                connect,
                winner,
                fetchWinner,
                fetchElectionState,
                connectWeb3Metamask,
                addCandidate,
                changePhaseofElection,
                registerVoterInSmartContract,
                fetchCandidates,
                casteVote
            }}
        >
            {children}
        </web3Context.Provider>
    );
};

export default Web3Provider;

export const useWeb3 = () => useContext(web3Context);
