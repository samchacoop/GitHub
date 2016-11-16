"""
Some Simple Melodies
Donya Quick
Last modified: 03-Sept-2016

Melodies implemented:
    twinkle: Twinkle Twinkle Little Star
    frere: Frere Jacques
    spider: The Itsy Bitsy Spider
    mcdonald: Old McDonald Had a Farm
    row: Row, Row, Row Your Boat (modified to avoid triplets)
    oldman: This Old Man
    yankee: Yankee Doodle
    happy: Happy Birthday (this is the only one in 3/4)

For each melody, x, xPs is the pitch list, xDs is the duration
list, and x is the music value built with pdPairsToMusic.

To create a list of pitch/duration pairs that are not part of
a music structure, you can use: v = zip(pList, dList)

To write music values to MIDI files, uncomment the section
at the bottom of the file and run it.
"""

from PythonEuterpea import *

# Twinkle Twinkle Little Star
twinklePs = [60, 60, 67, 67, 69, 69, 67,
             65, 65, 64, 64, 62, 62, 60,
             67, 67, 65, 65, 64, 64, 62,
             67, 67, 65, 65, 64, 64, 62,
             60, 60, 67, 67, 69, 69, 67,
             65, 65, 64, 64, 62, 62, 60
             ]
twinkleDs = [EN, EN, EN, EN, EN, EN, QN]*6
twinkle = pdPairsToMusic(zip(twinklePs, twinkleDs))

# Frere Jacques
frerePs = ([60,62,64,60]*2) + ([64,65,67]*2) + ([67,69,67,65,64,60]*2) + ([60,65,60]*2)
frereDs = ([QN,QN,QN,QN]*2) + ([QN,QN,HN]*2) + ([EN,EN,EN,EN,QN,QN]*2) + ([QN,QN,HN]*2)
frere = pdPairsToMusic(zip(frerePs, frereDs))


# The Itsy Bitsy Spider
spiderPs = [
    55, # This is a pickup - occurs before the first beat
    60,60,62,62,64,60,55,
    60,60,62,62,60,
    64,64,65,67,67,
    65,64,65,67,64,
    60,60,62,64,64,
    62,60,62,64,60,55,55,
    60,60,62,62,64,64,64,
    62,60,62,64,60]
spiderDs = [
    EN, # This ia a pickup - occurs before the first beat
    EN, EN, EN, EN, QN, EN, EN,
    EN, EN, EN, EN, HN,
    QN, EN, EN, QN, QN,
    EN, EN, EN, EN, HN,
    QN, EN, EN, QN, QN,
    EN, EN, EN, EN, QN, EN, EN,
    EN, EN, EN, EN, QN, EN, EN,
    EN, EN, EN, EN, QN
]
spider = pdPairsToMusic(zip(spiderPs, spiderDs))

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


rowPs = [60,60,60,62,64, 64,62,64,65,67, 72,72,67,67,64,64,60,60, 67,65,64,62,60]
rowDs = [QN,QN,EN,EN,QN, EN,EN,EN,EN,HN, EN,EN,EN,EN,EN,EN,EN,EN, EN,EN,EN,EN,HN]
row = pdPairsToMusic(zip(rowPs, rowDs))

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

yankeePs = [
    60,60,62,64,60,64,62,55,
    60,60,62,64,60,59,
    60,60,62,64,65,64,62,60,
    59,55,57,59,60,60,
    57,59,57,55,57,59,60,
    55,57,55,53,52,55,
    57,59,57,55,57,59,60,57,
    55,60,59,62,60,60
]
yankeeDs = \
    [EN]*8 + [EN]*4 + [QN, QN] + [EN]*8 + [EN]*4 + [QN, QN] + \
    [DEN, SN] + [EN]*4 + [QN] + [DEN, SN] + [EN]*2 + [QN]*2 + \
    [DEN, SN] + [EN]*6 + [EN]*4 + [QN, QN]

yankee = pdPairsToMusic(zip(yankeePs, yankeeDs))


happyPs = [55,55, # pickup - and this is also in 3/4!
           57,55,60,59,55,55,
           57,55,62,60,55,55,
           67,64,60,60,59,65,65,
           64,60,62,60]
happyDs = [EN,EN,
           QN,QN,QN,HN,EN,EN,
           QN,QN,QN,HN,EN,EN,
           QN,QN,QN,QN,QN,EN,EN,
           QN,QN,QN,DHN]
happy = pdPairsToMusic(zip(happyPs, happyDs))

#====================================================================
# Remove the tripple quotes below to uncomment the code for
# generating MIDI files.
#====================================================================

"""
musicToMidi("twinkle.mid", twinkle)
musicToMidi("frere.mid", frere)
musicToMidi("spider.mid", spider)
musicToMidi("mcdondald.mid", mcdonald)
musicToMidi("row.mid", row)
musicToMidi("oldman.mid", oldman)
musicToMidi("yankee.mid", yankee)
musicToMidi("happy.mid", happy)
"""
