import { useEffect, useState } from "react";
import { Tag } from "../../types/Tag";
import { getTagsFromApi } from "../../services/TagsService";

const NewQuestion = () => {
   const [tags, setTags] = useState<Tag[]>();

   useEffect(() => {
      getTagsFromApi().then((response) => setTags(response));
   }, []);

   return (
      <div className="container-xxl">
         <div className="row mt-4">
            <label className="col-md-1 col-form-label"> Tag:</label>
            <div className="col-md-8">
               <select className=" form-select form-select-md">
                  <option selected>Select The Tag</option>
                  {tags?.map((tag: Tag) => (
                     <option key={tag.tagId} value={tag.tagId}>
                        {tag.name}
                     </option>
                  ))}
               </select>
            </div>
         </div>

         <div className="row mt-4">
            <label className="col-md-1 col-form-label">Title:</label>
            <div className="col-md-8">
               <input className="form-control" />
            </div>
         </div>

         <div className="row mt-4">
            <label className="col-md-1 col-form-label">Title:</label>
            <div className="col-md-8">
               <input className="form-control" />
            </div>
         </div>
      </div>
   );
};

export default NewQuestion;
