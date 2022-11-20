import { AccountProps } from "../../types"

const Navbar = ({ accounts, setAccounts, children } : AccountProps) =>{
    const isConnected = accounts[0]

    if(!children){
        throw new Error('Children are not inside the Navbar provider!')
    }

    const connectAccount = async () =>{
        if(window.ethereum){
            const newAccounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            setAccounts(newAccounts)        
        }
    }

    const LinksBox = () =>{
        const childrenComponents = children.map(child => (
            <div className="link">
                { child }
            </div>
        ))

        return <div className="links"> { childrenComponents } <IfConnected /> </div>
    }

    const IfConnected = () =>{
        return isConnected 
                ? <div className="link"> Connected </div>
                : <button className='connect-wallet' onClick={connectAccount}> Connect </button> 
    }

    return (
        <nav className="nav">
            <LinksBox />
        </nav>
    )
}

export default Navbar