import { BigNumber, ethers } from "ethers"
import { ReactNode } from "react"

export type AccountProps = { 
    accounts: boolean[], 
    setAccounts: React.Dispatch<React.SetStateAction<boolean[]>>,
    children?: ReactNode[]
}

export type EthereumResponse = {
    method: string
}

export interface RoboPunksNFT {
    safeTransferFrom(
        from: string, 
        to: string, 
        tokenId: string,
        data?: any
    ): Promise<void>
    transferFrom(
        from: string, 
        to: string, 
        tokenId: string
    ): Promise<void>
    setApprovallForAll(
        operator: string,
        approved: boolean
    ): Promise<void>
    transferOwnership(newOwner: string): Promise<void>
    balanceOf(owner: string): Promise<BigNumber>
    ownerOf(tokenId_: number): Promise<string>
    tokenUri(tokenId_: number): Promise<string>
    setBaseTokenUri(baseTokenUri_: string): Promise<void>
    setIsPublicMintEnabled(isPublicMintEnabled_: boolean): Promise<void>
    mint(quantity_: BigNumber, s: any): Promise<void>
    withdraw(): Promise<void>
}

export type WalletInfo = [
    address: string,
    ethAmount: number,
    bezAmount: number,
] | []