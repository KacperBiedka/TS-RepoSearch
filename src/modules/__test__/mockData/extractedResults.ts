import mockResults from "./queryResults.json";
import { MockResponse } from './types';

export interface IMockResultObject {
  name: string,
  owner: string,
  stars: number,
  created_at: string,
  id: string | number,
}

const extractListData = (data: MockResponse): IMockResultObject[] | null => {
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
