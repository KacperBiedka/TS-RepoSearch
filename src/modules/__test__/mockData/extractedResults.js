import mockResults from "./queryResults.json";

const extractListData = (data) => {
  let displayData = null;
  if (data) {
    if (data.items.length > 0) {
      displayData = data.items.map((item) => {
        return {
          name: item.name,
          owner: item.owner.login,
          stars: item.stargazers_count,
          created_at: item.created_at,
          id: item.id,
        };
      });
    }
  }
  return displayData;
};

export default extractListData(mockResults);
