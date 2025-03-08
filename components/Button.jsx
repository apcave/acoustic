export default function Button({ children, ...props }) {
  return (
    <button
      className="focus:outline-none px-4 p-2 mb-5 text-sm md:text-base rounded-md bg-stone-600 text-stone-300 hover:bg-stone-500 hover:text-stone-100"
      {...props}
    >
      {children}
    </button>
  );
}
