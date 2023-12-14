import { useEffect, useState } from "react";
import { getTagsFromApi } from "../../services/TagsService";
import { Tag } from "../../types/Tag";

const RightComponent = () => {
   const [tags, setTags] = useState<Tag[]>();

   useEffect(() => {
      getTagsFromApi().then((response) => setTags(response));
   }, []);
   return (
      <div className="border">
         {tags?.map((tag: Tag) => {
            return (
               <h5 className="mt-4" key={tag.tagId}>
                  {tag.name}
               </h5>
            );
         })}
      </div>
   );
};

export default RightComponent;
