import Card from '@/elements/Card';
import PrinterEdit from '@/elements/PrinterEdit';
import Toner from '@/elements/Toner';

const Printer = ({printer, filteredToners, tonersUnset}) => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold">{`${printer.brand} ${printer.model}`}</span>
        <PrinterEdit printer={printer} filteredToners={filteredToners} tonersUnset={tonersUnset} />
      </div>
      {filteredToners.length ? (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredToners
            .sort((a, b) =>
              a.color > b.color ? 1 : a.color === b.color ? (a.size > b.size ? 1 : -1) : -1
            )
            .map(toner => (
              <Toner key={toner.id} toner={toner} />
            ))}
        </div>
      ) : (
        <p className="text-xl font-medium">
          No toners are associated to this printer, assign some!
        </p>
      )}
    </Card>
  );
};

export default Printer;
