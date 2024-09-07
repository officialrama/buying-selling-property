/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from "lodash-contrib";
import { CarouselThumbImage } from '../..';
import { decryptStr } from "../../../../helpers/encryptDecrypt";
import { openLink } from '../../../../helpers/newTab';


function projectList({projectData, image}) {
  return (
    <div class="w-full max-w-lg bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CarouselThumbImage
        imgSrc={image?.[decryptStr(projectData?.id)]}
        isVirtual={_.isNull(projectData?.mediaProject?.virtual360Url) ? false : projectData?.mediaProject?.virtual360Url}
        imgClassName="h-64 mobile:h-32"
        v360Link={() => openLink(projectData?.mediaProject?.virtual360Url, true)}
      />
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-[#00529C] dark:text-white">{projectData?.namaProyek}</h5>
        </a>
        <div class="flex justify-between items-center">
          <span class="text-sm font-bold text-gray-500 dark:text-white">{JSON.parse(projectData?.alamatProperti?.alamat)?.alamat}</span>
          <a href={`/project-details/${encodeURIComponent(projectData?.id)}`} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lihat Unit</a>
        </div>
      </div>
    </div>
  )
}

export default projectList