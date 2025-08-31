import React from 'react'
import Image from 'next/image'
import PDFsolve from '../images/PDFsolve.svg'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Home, History } from 'lucide-react'

export default function Header (){
              return (
                <div className='h-[80px] p-4 bg-gradient-to-r from-white to-gray-50 flex flex-row items-center border-b shadow-sm justify-between'>
                  
                    <div className='hover:opacity-90 transition-opacity'>
                        <Image src={PDFsolve} alt="logo" width={80} height={80} className='object-contain' />
                    </div>
                    <div className='flex flex-row items-center justify-center space-x-8'>
                        <Link 
                            href="/" 
                            className='text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-200 flex items-center gap-2'
                        >
                            <Home size={20} className="mb-0.5" />
                            <span>Home</span>
                        </Link>
                        <Link 
                            href="/history" 
                            className='text-gray-700 font-semibold hover:text-blue-600 transition-colors duration-200 flex items-center gap-2'
                        >
                            <History size={20} className='mb-0.5' />
                            <span>History</span>
                        </Link>
                        <div className='ml-2'>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>
              )
}