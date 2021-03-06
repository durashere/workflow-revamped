import Printer from '@/modules/printers/Printer';
import usePrinters from '@/modules/reactQuery/queries/usePrinters';

const PrintersList = () => {
  const {data: printersList, isLoading: isLoadingPrinters} = usePrinters();

  if (isLoadingPrinters) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {printersList.map(printer => (
        <Printer key={printer._id} printer={printer} />
      ))}
    </div>
  );
};

export default PrintersList;
