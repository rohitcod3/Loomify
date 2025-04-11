import React from 'react'
import Modal from '../modal'
import { Move } from 'lucide-react'
import ChangeVideoLocation from '@/components/forms/change-video-location'



type Props = {
    videoId : string
    currentWorkspace?: string
    currentFolder?: string
    currentFolderName?: string
}

function CardMenu({
    videoId,
    currentFolder,
    currentFolderName,
    currentWorkspace
}: Props) {
  return (
   <Modal className='flex items-center cursor-pointer gap-x-2'
   description='This action cannot be undone. This will permanently delete your account and remove your data from our servers'
   title='Move to a new Workspace/Folder'
   trigger={
    <Move
    size={20}
    fill='#a4a4a4'
    className='text-[#a4a4a4]'
    />
   }
   >
    <ChangeVideoLocation
    currentFolder={currentFolder}
    currentWorkSpace={currentWorkspace}
    currentFolderName={currentFolderName}
    videoId={videoId}
    />
   </Modal>
  )
}

export default CardMenu