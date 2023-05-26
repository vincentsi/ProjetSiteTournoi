import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';


export function bracketGeneration({  props }) {
     const SingleElimination = () => (
        <SingleEliminationBracket
          matches={matches}
          matchComponent={Match}
          svgWrapper={({ children, ...props }) => (
            <SVGViewer width={500} height={500} {...props}>
              {children}
            </SVGViewer>
          )}
        />
      );
  return (
    console.log("salut")

  );
}
