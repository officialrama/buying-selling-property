import React, {useEffect, useState} from "react";
import moment from 'moment';
import 'moment/locale/id';
import { Footer, RecomendArtikel } from "../../components/molecules";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DetailArticle, ListArticle } from "../../store/actions/fetchData/article-fetch";
import DOMPurify from "dompurify";
import { Breadcrumb } from "flowbite-react";
import ButtonGalery from "../../components/atoms/Button/button-galery";
import CopyToClipboard from "react-copy-to-clipboard";
import { formatDateIndo } from "../../helpers/date";
import { SnackBar } from "../../components/organisms";

const DetailHomespotUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {slug} = useParams();
  const [dataArticle, setDataArticle] = useState();
  const [listArticle, setListArticle] = useState([]);
  const [response, setResponse] = useState();
  const [hooksArticle, setHooksArticle] = useState({
    limit: 3,
    page: 0,
    all: true,
    order: "-published_at"
  });
  moment.locale('id');

  useEffect(() => {
    dispatch(DetailArticle(slug, setDataArticle, setResponse))
  },[])

  useEffect(() => {
    if(response === "00") {
    const keywordList =  dataArticle?.metadata?.keywords.join(",")
    dispatch(ListArticle(hooksArticle, setListArticle, keywordList, dataArticle?.type));
  }
  }, [response]);

    const url = window.location.href
    const imageName = dataArticle?.image_url.split("/")

    const removeTags = (html, tag) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const elements = doc.querySelectorAll(tag);
      elements.forEach(element => element.remove());
      return doc.body.innerHTML;
    };

    const extractTags = (html, tag) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const elements = doc.querySelectorAll(tag);
      let extractedHtml = "";
    
      elements.forEach((element, index) => {
        const id = `heading-${index}`;
        extractedHtml += `<a href="#${id}" class= ${element?.localName === 'h3' || element?.localName === 'h4' || element?.localName === 'h5' || element?.localName === 'h6' ? "text-[#777777] font-medium whitespace-nowrap leading-6" : "text-[#292929] font-semibold "}><p class="text-[#F8F9F9] mr-2">${element?.localName === 'h3' ? 'h' : ""}</p> ● ${element.outerText}</a>`;
      });
      return extractedHtml;
    };

    const convertYoutube = (html) => {
      const youtubeRegex = /(https:\/\/www\.youtube\.com\/watch\?v=[^"]+)">[^<]+<\/a>/g;
      return html.replace(youtubeRegex, (match, p1) => {
        const videoId = new URL(p1).searchParams.get("v");
        return `<iframe width="660" height="315" border-radius: 8px src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      });
    };

    const youtubeThumbnail = () => {
      const youtubeUrl = dataArticle?.video_url;
      if (youtubeUrl) {
        const videoId = new URL(youtubeUrl).searchParams.get("v");
        return `<iframe class="!w-full !h-[380px]" style="border-radius: 8px;" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      }
      return ""; 
    };

    const processContent = (html) => {
      const cleanHtml = DOMPurify.sanitize(html);
    
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleanHtml, "text/html");
    
      const headings = doc.querySelectorAll("h2, h3, h4, h5, h6");
      headings.forEach((heading, index) => {
        heading.id = `heading-${index}`; 
      });
      const updatedHtml = doc.body.innerHTML;
      const youtubeEmbed = convertYoutube(updatedHtml);
      return removeTags(updatedHtml, "h1");
    };
  
    const bodyContent = processContent(dataArticle?.body);
    const cleanDaftarIsi = extractTags(bodyContent, "h2, h3, h4, h5, h6");
    
    const handleShareButton = () => {
      window.localStorage.setItem('snackBarSucces', 'true')
    }

  return (
   <div>
    <SnackBar message="Berhasil menyalin tautan"/>
     <div className="flex flex-col px-[162px] pt-4 mobile:px-[8px]">
     <Breadcrumb className="pb-3">
          <span className="text-[#1078CA] font-semibold text-sm cursor-pointer mobile:text-xs" onClick={() => navigate('/') } >
            Home
            </span>
        <Breadcrumb.Item href="/homespot-update">
        <span className="text-[#1078CA] font-semibold text-sm mobile:text-xs">
            Homespot Detail Page
            </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
        <span className="text-[#777777] font-semibold text-sm mobile:text-xs ">
            {dataArticle?.title}
            </span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-row gap-4">
      <div className="flex flex-col sticky top-16 right-0 bg-[#F8F9F9] border border-[#D3D4D4] w-1/4 h-fit p-4 font-bold text-[#292929] text-sm mobile:hidden">
        <p className="font-bold text-[#292929] text-sm whitespace-nowrap">Daftar isi Artikel</p>
          <p className="flex flex-col gap-1 font-medium mt-3" 
          dangerouslySetInnerHTML={{ __html: cleanDaftarIsi}}/>
        </div>
        <div className="flex flex-col w-3/4 mobile:w-full gap-6 xxl:pr-[70px] largePc:pr-0 mobile:pr-0">
        <p className="text-[28px] leading-[42px] font-bold text-[#292929] ">{dataArticle?.title}</p>
        <div className="flex flex-row justify-between">
        <div className="flex flex-col">
        <p className="largePc:text-sm xxl:text-base mobile:text-sm text-[#777777] ">{dataArticle?.published_at ? moment.utc(dataArticle?.published_at).utcOffset("0").format("DD MMM YYYY") : "-"}</p>
        <p className="largePc:text-sm xxl:text-base mobile:text-sm text-[#777777] mr-3">Ditulis oleh <br className="hidden mobile:block"/><b className="text-[#292929] largePc:text-sm xxl:text-base mobile:text-sm">{dataArticle?.author}</b></p>
        </div>
        <CopyToClipboard text={url}>
        <button className="w-[179px] h-[48px] border border-[#1078CA] rounded-lg flex justify-center gap-[2px] items-center whitespace-nowrap px-4" onClick={handleShareButton}>
        <img src="/icons/small-icons/Share_gallery.svg" className="mr-[12px]" />
          <p className="text-[#1078CA] font-bold text-base">Bagikan Artikel</p>
        </button>
        </CopyToClipboard>
        </div>
        { dataArticle?.video_url !== '' ?
         <div dangerouslySetInnerHTML={{ __html: youtubeThumbnail() }} /> 
       : <img src={dataArticle?.image_url ? dataArticle?.image_url : "/images/default.jpg"} className="rounded-lg object-cover" style={{height : "380px"}} alt={imageName?.[4]}/> }
        <p className="prose-h2:text-2xl prose-h2:font-bold prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: bodyContent }}/>
        <RecomendArtikel data={listArticle || [] } />
        </div>
        </div>
     </div>
    <Footer />
   </div>
  );
};

export default DetailHomespotUpdate;