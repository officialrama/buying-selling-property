import { useState } from "react"

const useArticleHooks = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [paramsArticle, setParamsArticle] = useState({
        limit: 5,
        page: 0,
        category_id: "",
        keyword: "",
        type: "article",
        all: true,
        order: "-created_at",
        search:""
      })

    
    return {
        searchTerm,
        setSearchTerm,
        paramsArticle,
        setParamsArticle
    }
}

export default useArticleHooks