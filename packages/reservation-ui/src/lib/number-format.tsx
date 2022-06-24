export const NumberFormat: React.FC<{ children: number }> = ({ children }) => {
  return (
    <>
      {new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XPF',
      }).format(children)}
    </>
  );
};
