import { useEffect, useState } from 'react';
import { DealI } from '../components/dealsGrid/DealBox';

interface UseFilterDealsOptions {
  data: DealI[];
}

const useFilterDeals = ({ data }: UseFilterDealsOptions) => {
  const [filteredData, setFilteredData] = useState<DealI[]>([]);
  const [sender, setSender] = useState('');
  const [redeemedMarket, setRedeemedMarket] = useState('');

  const handleSetSender = (arg: string) => setSender(arg);
  const handleSetRedeemed = (arg: string) => setRedeemedMarket(arg);

  useEffect(() => {
    if (data.length) {
      const filteredItems = data.filter((item) => {
        let senderStatus = false;
        let redeemedStatus = false;

        if (!sender) {
          senderStatus = true;
        } else if (sender === 'All') {
          senderStatus = true;
        } else if (item.senders.includes(sender)) {
          senderStatus = true;
        }

        if (!redeemedMarket) {
          redeemedStatus = true;
        } else if (redeemedMarket === 'All') {
          redeemedStatus = true;
        } else if (item.redemptionMarket.includes(redeemedMarket)) {
          redeemedStatus = true;
        }

        if (senderStatus && redeemedStatus) return item;
      });

      setFilteredData(filteredItems);
    }
  }, [data, redeemedMarket, sender]);

  return { filteredData, handleSetRedeemed, handleSetSender };
};

export default useFilterDeals;
