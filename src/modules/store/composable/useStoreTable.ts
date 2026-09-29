import { useCallback, useState } from "react";
import useStoreService from "../store.service";
import type { BaseListRecordResponse } from "../../../core/base.interface";
import type {
  StoreListRecord,
  StoreListRecordRequest,
} from "../store.interface";
import type { PaginationProps } from "@arco-design/web-react";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import useNotification from "../../../core/notification.service";

export const useStoreTable = () => {
  const { fetchStores, fetchStoreTags } = useStoreService();
  const [storeTableLoading, setStoreTableLoading] = useState<boolean>(false);
  const [storeList, setStoreList] = useState<
    BaseListRecordResponse<StoreListRecord>
  >({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });
  const [tagOptions, setTagOptions] = useState<string[]>([]);

  const handleStoreTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof StoreListRecord, string[]>>,
  ) => {
    const sort =
      !Array.isArray(sorter) && sorter.direction
        ? `${sorter.field}:${sorter.direction}`
        : undefined;

    const tagList = filters.tags?.join(";");
    const param: StoreListRecordRequest = {
      page: (pagination.current ?? 1) - 1,
      size: pagination.pageSize ?? 10,
      sort: sort,
      name: filters.name ? filters.name[0] : undefined,
      address: filters.address ? filters.address[0] : undefined,
      tagList: tagList ? tagList : undefined,
    };
    getStoreRecordData(param);
    return param;
  };

  const { failed } = useNotification();
  const getStoreRecordData = useCallback(
    async (param: StoreListRecordRequest) => {
      try {
        setStoreTableLoading(true);
        const response = await fetchStores(param);
        setStoreList(response);
        const tagOptionsResponse = await fetchStoreTags();
        setTagOptions(tagOptionsResponse);
      } catch (err) {
        console.log(err);
        failed(NOTIFICATION_MESSAGE.FETCH_FAILED);
      } finally {
        setStoreTableLoading(false);
      }
    },
    [failed, fetchStores],
  );

  return {
    storeList,
    tagOptions,
    handleStoreTableChange,
    getStoreRecordData,
    storeTableLoading,
  };
};
