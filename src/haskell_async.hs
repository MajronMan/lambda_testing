{-# LANGUAGE OverloadedStrings #-}

import Control.Lens
import Control.Monad.Parallel (replicateM_)
import Network.HTTP.Conduit (newManager)

import qualified Data.Time                   as Time
import qualified Network.AWS                 as AWS
import qualified Network.AWS.Lambda          as Lambda

main = do
    env <- AWS.newEnv AWS.Discover <&> AWS.envRegion .~ AWS.NorthVirginia

    start <- Time.getCurrentTime

    replicateM_ 10
        . AWS.runResourceT . AWS.runAWS env
        . foldr1 (>>) . replicate 100
        . AWS.send $ Lambda.invoke "testFunc" ""

    end <- Time.getCurrentTime

    print $ Time.diffUTCTime end start
