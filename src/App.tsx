import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import MainMint from './components/MainMint'

const App = () =>{
  const [accounts, setAccounts] = useState<boolean[]>([])

  return (
    <div className="App">
      <Navbar 
        accounts={accounts} 
        setAccounts={setAccounts} 
      >
        <div className='about'> About </div>
        <div className='mine'> Mine </div>
        <div className='team'> Team </div>
      </Navbar>
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
