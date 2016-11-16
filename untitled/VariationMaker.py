'''
SAMUEL COOPER

What you need to do (see assignment spec for full details):
    (1) Complete the definition of flipHalves
    (2) Pick probabilities. Hint: doNothing should actually be very likely for good results!
        You will probably need to come back and alter this definition a few times.
    (3) Complete the Par case definition of vary
    (4) Generate some variations of melodies that use different tree structures.
    (5) PDF report: how well did your approach do? Good results? Bad results? Why?
'''

from PythonEuterpea import *
from Examples import *
from random import *
from SimpleMelodies import *


def chooseDist(probs):
    '''
    Given a probability distribution as a list, choose an index according to that distribution.
    :param probs: a list that sums to 1.0
    :return: an index from the list
    '''
    # First, we must generate a random number in [0.0, 1.0] (inclusive of ends)
    r = uniform(0.0, 1.0)
    n = len(probs)
    if n > 0:  # do we have things to look through?
        for i in range(0, len(probs)):  # yes - start looking left to right
            if r < probs[i]:  # have we used up r's probability mass?
                return i  # return current index
            else:  # no - so subtract mass from r
                r = r - probs[i]
    else:  # user supplied an empty list
        raise ValueError('(choose) Nothing to choose from!')  # nothing we can do but print an error
    return n - 1  # default case to fetch the LAST item in case of floating point precision problems


def repeatFirst(m):
    d = dur(m)
    m2 = deepcopy(m)
    m2 = cut(m2, d/2)
    m3 = deepcopy(m2)
    return Seq(m2, m3)

foo = repeatFirst(deepcopy(twinkle))
print foo

def doNothing(m):
    return m

def repeatSecond(m):
    d = dur(m)
    m2 = deepcopy(m)
    m2 = remove(m2, d/2)
    m3 = deepcopy(m2)
    return Seq(m2,m3)


def flipHalves(m):
    d = dur(m)
    d2 = dur(m)
    m2 = deepcopy(m)
    m2 = cut(m2, d / 2)
    m3 = deepcopy(m)
    m3 = remove(m2, d / 2)
    return Seq(m3, m2)

# These are the functions and probabilities with which to apply them
# variationFuns =  [reverse, invert, repeatFirst, repeatSecond, doNothing]
variationFuns =  [reverse, invert, repeatFirst, repeatSecond, flipHalves, doNothing]
variationProbs = [0.05, 0.05, 0.05, 0.05, 0.05,  0.75] # (2) CHOOSE PROBABILITIES FOR THIS
#foo = variationFuns[i](blah)


def vary(x):
    if (x.__class__.__name__ == 'Music'):
        x.tree = vary(x.tree)
        i = chooseDist(variationProbs)
        x.tree = variationFuns[i](x.tree) # optional; you may want to get rid of this or keep it, your choice
        return x
    elif (x.__class__.__name__ == 'Note' or x.__class__.__name__ == 'Rest'):
        return x
    elif (x.__class__.__name__ == 'Seq'):
        # An improved method - this is a bit different than the one from class on Monday
        x.left = vary(x.left)
        x.right = vary(x.right)
        i = chooseDist(variationProbs)
        return variationFuns[i](x)


        '''
        Below is the way we had in class, but it is not as good as the version
        above. Why? Because it ends up allowing variation on things of unknown
        structure. For example, it may be that x.left is a single Note - and that
        can end up splitting into two notes if something like repeatFirst gets
        called. This is also why we ended up with infinite recursion (endless
        splitting of notes sometimes, but not others).

        x.left = vary(x.left)
        x.right = vary(x.right)
        x.left = variationFuns[i1](x.left)
        i2 = chooseDist(variationProbs)
        x.right = variationFuns[i2](x.right)
        return x
        '''

    elif (x.__class__.__name__ == 'Par'):
        x.top = vary(x.top)
        x.bot = vary(x.bot)
        i = chooseDist(variationProbs)
        return variationFuns[i](x)

    elif (x.__class__.__name__ == 'Modify'):
        x.tree = vary(x.tree)
        # optional: apply a function to x.tree as was done at the Music step
        return x
    else:
        raise EuterpeaException("Unrecognized musical structure: "+str(x))


# What we generated in class
x1 = vary(deepcopy(spider))
x2 = vary(deepcopy(spider))
x3 = vary(deepcopy(spider))
x4 = vary(deepcopy(spider))
x5 = Seq(x1, x2)
x6 = Seq(x3, x4)

z1 = vary(deepcopy(mcdonald))
print z1
musicToMidi("x1.mid", z1)

'''
4. What you need to do: generate more variations like this:

x1 = vary(deepcopy(someMusic1))
x2 = vary(deepcopy(someMusic2))
etc.

You may wish to seed the generator to control output more closely.
'''

