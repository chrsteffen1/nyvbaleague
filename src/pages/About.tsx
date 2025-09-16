import React from 'react';
import Hero from '../components/Hero';
import { Calendar, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// DB row types
type DivisionRow = { id: string; name: string };
type TeamRow = { id: string; division_id: string; name: string; wins: number; losses: number };

// Helpers for UI
const nightFor = (divisionName: string) => {
  const nm = divisionName.toLowerCase();
  if (nm.includes('women')) return 'Wednesday';
  // Treat anything that looks like Men's A as Tuesday; everything else (incl. Men's B) Wednesday
  const compact = nm.replace(/[\s_\-]/g, '');
  if (compact === 'mensa' || (nm.includes('mens') && nm.includes('a') && !nm.includes('b'))) return 'Tuesday';
  return 'Wednesday';
};

const colorFor = (divisionName: string) => {
  const nm = divisionName.toLowerCase();
  if (nm.includes('women')) return 'bg-pink-600';
  const compact = nm.replace(/[\s_\-]/g, '');
  if (compact === 'mensa' || (nm.includes('mens') && nm.includes('a') && !nm.includes('b'))) return 'bg-blue-900';
  return 'bg-blue-700';
};

const About: React.FC = () => {
  const [divisions, setDivisions] = React.useState<DivisionRow[]>([]);
  const [teams, setTeams] = React.useState<TeamRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedDivisionName, setSelectedDivisionName] = React.useState<string | null>(null);

  // Fetch divisions + teams from Supabase (same source as Scores page)
  const fetchAll = React.useCallback(async () => {
    const [{ data: d }, { data: t }] = await Promise.all([
      supabase.from('divisions').select('*').order('name'),
      supabase.from('teams').select('*'),
    ]);
    setDivisions(d ?? []);
    setTeams(t ?? []);
  }, []);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchAll();
      setLoading(false);
    })();
  }, [fetchAll]);

  // Build division -> teams[] map, sorted by team name
  const divisionTeams = React.useMemo(() => {
    const byDiv: Record<string, { id: string; name: string }[]> = {};
    divisions.forEach((div) => (byDiv[div.name] = []));
    const byIdDiv = Object.fromEntries(divisions.map((d) => [d.id, d.name]));
    teams.forEach((t) => {
      const divName = byIdDiv[t.division_id];
      if (!divName) return;
      (byDiv[divName] ||= []).push({ id: t.id, name: t.name });
    });
    Object.keys(byDiv).forEach((k) => byDiv[k].sort((a, b) => a.name.localeCompare(b.name)));
    return byDiv;
  }, [divisions, teams]);

  if (loading) {
    return (
      <div>
        <Hero
          title="About Our League"
          subtitle="We're your live home for high-level amateur volleyball in Long Island, NY!"
          backgroundImage="https://images.pexels.com/photos/1277213/pexels-photo-1277213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">Loading…</div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title="About Our League"
        subtitle="We're your live home for high-level amateur volleyball in Long Island, NY!"
        backgroundImage="https://images.pexels.com/photos/1277213/pexels-photo-1277213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* League History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                9 Years of NYVBA — this league had a unique start and, like any other project, it has
                developed through its struggles, growth, exposure & recognition.
              </p>
              <p className="text-gray-700 mb-4">
                This league started with a lot of incomplete ideas, but after 9 years we can proudly say,
                through immense hard work by Sunny, Steve, Amar & the entire NYVBA team, we have reached
                new heights.
              </p>
              <p className="text-gray-700 mb-4">
                This is all due to the trust & support given to us by all the players & sponsors.
                We just want to say — Thank You!
              </p>
              <p className="text-gray-700">
                Keep believing in us & we will continue to do good work that will make everyone
                associated with the league proud!
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <img
                  src="https://images.pexels.com/photos/6203510/pexels-photo-6203510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Volleyball match in our league"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions (dynamic teams, no weekly schedule list) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Divisions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Men’s A plays on Tuesday nights; Men’s B and Women’s play on Wednesday nights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {divisions.map((div) => {
              const teamsInDiv = divisionTeams[div.name] ?? [];
              const headerColor = colorFor(div.name);
              const isOpen = selectedDivisionName === div.name;

              return (
                <div
                  key={div.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedDivisionName(isOpen ? null : div.name)}
                >
                  <div className={`h-48 ${headerColor} text-white flex items-center justify-center`}>
                    <Trophy size={64} />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-2">{div.name}</h3>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar size={16} className="mr-2" />
                      <span>{nightFor(div.name)} Nights</span>
                    </div>

                    {isOpen && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold mb-2">Teams:</h4>
                        {teamsInDiv.length === 0 ? (
                          <div className="text-gray-500 text-sm">No teams yet.</div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {teamsInDiv.map((t) => (
                              <div key={t.id} className="bg-gray-50 p-2 rounded text-center text-sm">
                                {t.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
