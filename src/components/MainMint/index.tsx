import { useEffect, useState } from "react"
import { ethers, BigNumber } from "ethers"

import { AccountProps, RoboPunksNFT, WalletInfo } from "../../types"
import bezikNFT from '../../BezikNFT.json'

const BEZAddress = '0x76A0aDE26f1a39E5A667A97f4845b013C502C696'

const MainMint = ({ accounts } : AccountProps) =>{
    const [mintAmount, setMintAmount] = useState(1)
    const [walletInfo, setWalletInfo] = useState<WalletInfo>()
    const isConnected = accounts[0]

    useEffect(() =>{
        const setWalletInformation = async () =>{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                BEZAddress,
                bezikNFT.abi,
                signer
            ) as ethers.Contract & RoboPunksNFT
            
            const address = await signer.getAddress()
            const ethAmount = (await signer.getBalance()).toNumber()
            const bezAmount =  (await contract.balanceOf(address)).toNumber()

            setWalletInfo([address, ethAmount, bezAmount])
        }
        
        setWalletInformation()
    }, [isConnected])

    const handleMint = async() =>{
        if(window.ethereum && isConnected){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                BEZAddress,
                bezikNFT.abi,
                signer
            ) as ethers.Contract & RoboPunksNFT

            try {
                const res = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02*mintAmount).toString()),
                })
                console.log(`Response: ${res}`)
            } catch(err){
                throw new Error('Mint error')
            }
        }
    }

    const handleMintChange = (mode: 'plus' | 'minus') =>{
        if (mode === 'minus') {
            if (mintAmount <= 1) throw new Error('Amount can not be lower')
            setMintAmount(mintAmount - 1)
        } else if (mode === 'plus') {
            setMintAmount(mintAmount + 1)
        } 
        else throw new Error('Can not recognize mode used')
    }

    const IfWalletInfo = () =>{
        if(isConnected && walletInfo) {
            const [ address, ethAmount, bezAmount ] = walletInfo

            return (
                <div className="wallet-info-el">
                    <div 
                        className="address wallet-info-el"> 
                        Address: { address } 
                    </div>
                    <div 
                        className="eth-amount wallet-info-el">
                        ETH: { ethAmount } 
                    </div>
                    <div 
                        className="nft-amount wallet-info-el"> 
                        BEZ: { bezAmount } 
                    </div>
                </div>
            )
        } else return <></>
    }

    const IfConnected = () =>{

        if(isConnected){
            return (
            <div className="mint">
                <div className="mint-btns">
                    <button onClick={() => handleMintChange(('minus'))} className='operate-btn'> - </button>
                    <input className='mintAmount' type='number' defaultValue={mintAmount} />
                    <button onClick={() => handleMintChange(('plus'))} className='operate-btn'> + </button>
                </div>
                <button className='mint-btn'onClick={handleMint}> Mint Now! </button>
            </div>                    
            )
        } else return <p> You must be connected to mint </p>
    }

    return (
        <div className="mint-box">
            <h1> BEZ </h1>
            <p> Bezik Token </p>
            <IfConnected />
            <IfWalletInfo />
        </div>
    )
}

export default MainMint