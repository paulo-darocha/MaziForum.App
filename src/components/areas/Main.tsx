import { useEffect, useState } from "react";
import { Tag } from "../../types/Tag";
import { getTagsFromApi } from "../../services/TagsService";
import { useAppSelector } from "../../storeRedux/ReduxStore";
import { Link } from "react-router-dom";

const MainComponent = () => {
   const [tags, setTags] = useState<Tag[]>();
   const logged = useAppSelector((x) => x.user.isLogged);

   useEffect(() => {
      getTagsFromApi().then((response) => setTags(response));
   }, []);

   return (
      <div className="container-xxl">
         <div className="row">
            <div className="col-md-1 my-4 h4">Tag:</div>
            <div className="col-md-8">
               <select className=" form-select form-select-lg my-3">
                  <option selected>Latest Questions</option>
                  {tags?.map((tag: Tag) => (
                     <option key={tag.tagId} value={tag.tagId}>
                        {tag.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="col-md-3 d-grid">
               {logged && (
                  <Link
                     to="/question"
                     className="btn btn-primary btn-lg my-3"
                     type="button"
                  >
                     Post a Question
                  </Link>
               )}
            </div>
         </div>
      </div>
   );
};

export default MainComponent;
