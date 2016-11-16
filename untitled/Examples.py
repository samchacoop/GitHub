'''
Some example melodies in PythonEuterpea using different tree structures.
Donya Quick
'''

from PythonEuterpea import *

# One tree structure for "Old McDonald Had a Farm." This version
# has a skewed tree of the form Seq(n1, Seq(n2, Seq(n3, ...)))
# (in other words, subtrees only grow to one side).

mcdonaldPs = [
    60,60,60,55,57,57,55,64,64,62,62,60,55,
    60,60,60,55,57,57,55,64,64,62,62,60,55,55,
    60,60,60,55,55,60,60,60,
    60,60,60,60,60,60,
    60,60,60,60,60,60,
    60,60,60,55,57,57,55,64,64,62,62,60
]
mcdonaldDs = [
    EN,EN,EN,EN,EN,EN,QN,EN,EN,EN,EN,DQN,EN,
    EN,EN,EN,EN,EN,EN,QN,EN,EN,EN,EN,DQN,SN,SN,
    EN,EN,EN,SN,SN,EN,EN,QN,
    SN,SN,EN,SN,SN,EN,
    SN,SN,SN,SN,EN,EN,
    EN,EN,EN,EN,EN,EN,QN,EN,EN,EN,EN,HN
]
mcdonald = pdPairsToMusic(zip(mcdonaldPs, mcdonaldDs))


# Another tree structure for the same thing. This creates inner nodes that
# represent two-measure chunks. Subtrees within that are still skewed.

mcdonaldPs2 = [
    [60,60,60,55,57,57,55,64,64,62,62,60,55],
    [60,60,60,55,57,57,55,64,64,62,62,60,55,55],
    [60,60,60,55,55,60,60,60],
    [60,60,60,60,60,60],
    [60,60,60,60,60,60],
    [60,60,60,55,57,57,55,64,64,62,62,60]
]

mcdonaldDs2 = [
    [EN,EN,EN,EN,EN,EN,QN,EN,EN,EN,EN,DQN,EN],
    [EN,EN,EN,EN,EN,EN,QN,EN,EN,EN,EN,DQN,SN,SN],
    [EN,EN,EN,SN,SN,EN,EN,QN],
    [SN,SN,EN,SN,SN,EN],
    [SN,SN,SN,SN,EN,EN],
    [EN,EN,EN,EN,EN,EN,QN,EN,EN,EN,EN,HN]
]

mcdonald2 = line(map(lambda x: pdPairsToMusic(zip(x[0], x[1])), zip(mcdonaldPs2, mcdonaldDs2)))

# "This Old Man"

oldmanPs = [
    67,64,67,67,64,67,
    69,67,65,64,62,64,65,64,65,
    67,60,60,60,60,62,64,65,67,
    67,62,62,65,64,62,60
]
oldmanDs = [
    EN,EN,QN,EN,EN,QN,
    EN,EN,EN,EN,EN,EN,EN,SN,SN,
    EN,EN,EN,EN,SN,SN,SN,SN,QN,
    EN,EN,EN,EN,EN,EN,QN
]
oldman = pdPairsToMusic(zip(oldmanPs, oldmanDs))

# "Another tree structure for "This Old Man"

oldmanPs2 = [
    [67,64,67,67,64,67],
    [69,67,65,64,62,64,65,64,65],
    [67,60,60,60,60,62,64,65,67],
    [67,62,62,65,64,62,60]
]
oldmanDs2 = [
    [EN,EN,QN,EN,EN,QN],
    [EN,EN,EN,EN,EN,EN,EN,SN,SN],
    [EN,EN,EN,EN,SN,SN,SN,SN,QN],
    [EN,EN,EN,EN,EN,EN,QN]
]
oldman2 = line(map(lambda x: pdPairsToMusic(zip(x[0], x[1])), zip(oldmanPs2, oldmanDs2)))


# Just some chords. It is represented two ways: a sequence of chords, and a parallel
# composition of 3 melodies.

#          C  E  G     D  F  A     D  G  B     E  G  C     D  G  A     D  F  A     D  G  B     E  G  C
chords = [[60,64,67], [62,65,69], [62,67,71], [64,67,72], [62,67,69], [62,65,69], [62,67,71], [64,67,72]]

chordMusic1 = chordListToMusic(chords, QN) # this is an outer sequential composition of parallels

mel1 = pitchListToMusic([60, 62, 62, 64, 62, 62, 62, 64], QN)
mel2 = pitchListToMusic([64, 65, 67, 67, 67, 65, 67, 67], QN)
mel3 = pitchListToMusic([67, 69, 71, 72, 69, 69, 71, 72], QN)
chordMusic2 = chord([mel1,mel2,mel3]) # this is an outer parallel composition of sequentials


'''
# Uncomment this section to write everything to files
musicToMidi("oldman.mid", oldman)
musicToMidi("oldman2.mid", oldman2)
musicToMidi("mcdonald.mid", mcdonald)
musicToMidi("mcdonald2.mid", mcdonald2)
musicToMidi("chords1.mid", chordMusic1)
musicToMidi("chords2.mid", chordMusic2)
'''
